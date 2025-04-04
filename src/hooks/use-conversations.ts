import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface Conversation {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  content: string;
  is_user: boolean;
  created_at: string;
  reactions?: MessageReaction[];
}

export interface MessageReaction {
  id: string;
  message_id: string;
  user_id: string;
  type: string;
  created_at: string;
}

export const useConversations = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoadingConversations, setIsLoadingConversations] = useState(false);

  // Fetch conversations for the current user
  const fetchConversations = useCallback(async () => {
    if (!user) return;
    
    setIsLoadingConversations(true);
    
    try {
      const { data, error } = await supabase
        .from("conversations")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });
        
      if (error) throw error;
      
      setConversations(data || []);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    } finally {
      setIsLoadingConversations(false);
    }
  }, [user]);
  
  // Load conversations when user changes
  useEffect(() => {
    if (user) {
      fetchConversations();
    } else {
      setConversations([]);
    }
  }, [user, fetchConversations]);

  // Create a new conversation
  const createConversation = async (title: string) => {
    if (!user) return null;
    
    try {
      const { data, error } = await supabase
        .from("conversations")
        .insert({
          title,
          user_id: user.id,
        })
        .select()
        .single();
        
      if (error) throw error;
      
      setConversations(prev => [data, ...prev]);
      return data;
    } catch (error) {
      console.error("Error creating conversation:", error);
      return null;
    }
  };

  // Delete a conversation
  const deleteConversation = async (id: string) => {
    try {
      const { error } = await supabase
        .from("conversations")
        .delete()
        .eq("id", id);
        
      if (error) throw error;
      
      setConversations(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error("Error deleting conversation:", error);
    }
  };

  // Rename a conversation
  const renameConversation = async ({ id, title }: { id: string; title: string }) => {
    try {
      const { error } = await supabase
        .from("conversations")
        .update({ title, updated_at: new Date().toISOString() })
        .eq("id", id);
        
      if (error) throw error;
      
      setConversations(prev =>
        prev.map(c => (c.id === id ? { ...c, title, updated_at: new Date().toISOString() } : c))
      );
    } catch (error) {
      console.error("Error renaming conversation:", error);
    }
  };

  // Get messages for a conversation
  const getMessages = async (conversationId: string): Promise<Message[]> => {
    try {
      // First get the messages
      const { data: messages, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", conversationId)
        .order("created_at");
        
      if (error) throw error;
      
      return messages || [];
    } catch (error) {
      console.error("Error fetching messages:", error);
      return [];
    }
  };

  // Add a new message to a conversation
  const addMessage = async ({
    conversationId,
    content,
    isUser = true,
  }: {
    conversationId: string;
    content: string;
    isUser?: boolean;
  }) => {
    try {
      // Add the message
      const { data, error } = await supabase
        .from("messages")
        .insert({
          conversation_id: conversationId,
          content,
          is_user: isUser,
        })
        .select()
        .single();
        
      if (error) throw error;
      
      // Update conversation's updated_at timestamp
      await supabase
        .from("conversations")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", conversationId);
        
      return data;
    } catch (error) {
      console.error("Error adding message:", error);
      return null;
    }
  };
  
  // Update a message
  const updateMessage = async (messageId: string, content: string) => {
    try {
      const { error } = await supabase
        .from("messages")
        .update({ content })
        .eq("id", messageId);
        
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error("Error updating message:", error);
      return false;
    }
  };
  
  // Add a reaction to a message
  const addReaction = async (messageId: string, reactionType: string) => {
    if (!user) return false;
    
    try {
      // First check if the user already reacted with this type
      const { data: existingReaction, error: checkError } = await supabase
        .from("message_reactions")
        .select("*")
        .eq("message_id", messageId)
        .eq("user_id", user.id)
        .eq("type", reactionType)
        .maybeSingle();
        
      if (checkError) throw checkError;
      
      // If the reaction already exists, remove it (toggle behavior)
      if (existingReaction) {
        const { error } = await supabase
          .from("message_reactions")
          .delete()
          .eq("id", existingReaction.id);
          
        if (error) throw error;
        return true;
      }
      
      // Otherwise, add the new reaction
      const { error } = await supabase
        .from("message_reactions")
        .insert({
          message_id: messageId,
          user_id: user.id,
          type: reactionType,
        });
        
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error("Error adding reaction:", error);
      return false;
    }
  };

  // Subscribe to real-time updates for messages in a conversation
  const subscribeToMessages = (conversationId: string, onNewMessage: (message: Message) => void) => {
    const subscription = supabase
      .channel(`conversation-${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          onNewMessage(payload.new as Message);
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(subscription);
    };
  };

  return {
    conversations,
    isLoadingConversations,
    createConversation,
    deleteConversation,
    renameConversation,
    getMessages,
    addMessage,
    updateMessage,
    addReaction,
    subscribeToMessages,
  };
};
