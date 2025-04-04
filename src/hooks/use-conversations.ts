
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

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
    const { data, error } = await supabase
      .from("conversations")
      .insert([{ title }])
      .select()
      .single();

    if (error) {
      toast.error("Không thể tạo hội thoại: " + error.message);
      throw error;
    }

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
    addMessage: messageMutation.mutate,
  };
}
