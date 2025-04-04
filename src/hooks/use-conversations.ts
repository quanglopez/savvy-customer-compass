
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export type Conversation = {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
};

export type Message = {
  id: string;
  content: string;
  conversation_id: string;
  is_user: boolean;
  created_at: string;
};

export function useConversations() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const getConversations = async (): Promise<Conversation[]> => {
    const { data, error } = await supabase
      .from("conversations")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) {
      toast.error("Không thể tải hội thoại: " + error.message);
      throw error;
    }

    return data || [];
  };

  const getMessages = async (conversationId: string): Promise<Message[]> => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    if (error) {
      toast.error("Không thể tải tin nhắn: " + error.message);
      throw error;
    }

    return data || [];
  };

  const createConversation = async (title: string): Promise<Conversation> => {
    if (!user) {
      toast.error("Bạn cần đăng nhập để tạo hội thoại");
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from("conversations")
      .insert([{ title, user_id: user.id }])
      .select()
      .single();

    if (error) {
      toast.error("Không thể tạo hội thoại: " + error.message);
      throw error;
    }

    return data;
  };

  const deleteConversation = async (conversationId: string): Promise<void> => {
    if (!user) {
      toast.error("Bạn cần đăng nhập để xóa hội thoại");
      throw new Error("User not authenticated");
    }

    // First delete all messages in the conversation
    const { error: messagesError } = await supabase
      .from("messages")
      .delete()
      .eq("conversation_id", conversationId);

    if (messagesError) {
      toast.error("Không thể xóa tin nhắn: " + messagesError.message);
      throw messagesError;
    }

    // Then delete the conversation
    const { error } = await supabase
      .from("conversations")
      .delete()
      .eq("id", conversationId);

    if (error) {
      toast.error("Không thể xóa hội thoại: " + error.message);
      throw error;
    }

    toast.success("Đã xóa hội thoại");
  };

  const renameConversation = async (conversationId: string, newTitle: string): Promise<Conversation> => {
    if (!user) {
      toast.error("Bạn cần đăng nhập để đổi tên hội thoại");
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from("conversations")
      .update({ title: newTitle, updated_at: new Date().toISOString() })
      .eq("id", conversationId)
      .select()
      .single();

    if (error) {
      toast.error("Không thể đổi tên hội thoại: " + error.message);
      throw error;
    }

    toast.success("Đã đổi tên hội thoại");
    return data;
  };

  const addMessage = async ({
    conversationId,
    content,
    isUser = true,
  }: {
    conversationId: string;
    content: string;
    isUser?: boolean;
  }): Promise<Message> => {
    const { data, error } = await supabase
      .from("messages")
      .insert([
        {
          conversation_id: conversationId,
          content,
          is_user: isUser,
        },
      ])
      .select()
      .single();

    if (error) {
      toast.error("Không thể gửi tin nhắn: " + error.message);
      throw error;
    }

    // Update the conversation's updated_at timestamp
    await supabase
      .from("conversations")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", conversationId);

    return data;
  };

  // Set up real-time subscription for messages
  const subscribeToMessages = (conversationId: string, callback: (message: Message) => void) => {
    const subscription = supabase
      .channel(`messages:${conversationId}`)
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`
        },
        (payload) => {
          const newMessage = payload.new as Message;
          callback(newMessage);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  };

  const conversations = useQuery({
    queryKey: ["conversations"],
    queryFn: getConversations,
  });

  const conversationMutation = useMutation({
    mutationFn: createConversation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      toast.success("Đã tạo hội thoại mới");
    },
  });

  const deleteConversationMutation = useMutation({
    mutationFn: deleteConversation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });

  const renameConversationMutation = useMutation({
    mutationFn: ({ id, title }: { id: string; title: string }) => 
      renameConversation(id, title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });

  const messageMutation = useMutation({
    mutationFn: addMessage,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["messages", variables.conversationId],
      });
    },
  });

  return {
    conversations: conversations.data || [],
    isLoadingConversations: conversations.isLoading,
    getMessages,
    createConversation: conversationMutation.mutate,
    deleteConversation: deleteConversationMutation.mutate,
    renameConversation: renameConversationMutation.mutate,
    addMessage: messageMutation.mutate,
    subscribeToMessages,
  };
}
