
import { useState, useEffect } from 'react';
import { useToast } from './use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export type Conversation = {
  id: string;
  title: string;
  user_id: string;
  created_at: string;
  updated_at: string;
};

export type Message = {
  id: string;
  content: string;
  conversation_id: string;
  is_user: boolean;
  created_at: string;
  reactions?: Reaction[];
};

export type Reaction = {
  id: string;
  message_id: string;
  user_id: string;
  type: string;
  created_at: string;
};

export function useConversations() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchConversations();
    } else {
      setConversations([]);
      setCurrentConversation(null);
      setMessages([]);
      setIsLoading(false);
    }
  }, [user]);

  const fetchConversations = async () => {
    if (!user?.id) return;

    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });
        
      if (error) throw error;
      
      setConversations(data || []);
      
      if (data && data.length > 0 && !currentConversation) {
        setCurrentConversation(data[0]);
        fetchMessages(data[0].id);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      toast({
        title: "Error fetching conversations",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const fetchMessages = async (conversationId: string) => {
    if (!user?.id) return;

    try {
      setIsLoading(true);
      
      // Get messages with their reactions
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          reactions:message_reactions(*)
        `)
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });
        
      if (error) throw error;
      
      setMessages(data || []);
      setIsLoading(false);
    } catch (error) {
      toast({
        title: "Error fetching messages",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const selectConversation = (id: string) => {
    const conversation = conversations.find(c => c.id === id);
    if (conversation) {
      setCurrentConversation(conversation);
      fetchMessages(id);
    }
  };

  const createConversation = async (title: string) => {
    if (!user?.id) return null;

    try {
      const newConversation = {
        title,
        user_id: user.id,
      };
      
      const { data, error } = await supabase
        .from('conversations')
        .insert(newConversation)
        .select()
        .single();
        
      if (error) throw error;
      
      setConversations([data, ...conversations]);
      setCurrentConversation(data);
      setMessages([]);
      
      return data;
    } catch (error) {
      toast({
        title: "Error creating conversation",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateConversationTitle = async (id: string, title: string) => {
    try {
      const { error } = await supabase
        .from('conversations')
        .update({ title, updated_at: new Date().toISOString() })
        .eq('id', id);
        
      if (error) throw error;
      
      // Update local state
      setConversations(conversations.map(c => 
        c.id === id ? { ...c, title, updated_at: new Date().toISOString() } : c
      ));
      
      if (currentConversation?.id === id) {
        setCurrentConversation({ ...currentConversation, title, updated_at: new Date().toISOString() });
      }
      
      toast({
        title: "Success",
        description: "Conversation title updated",
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Error updating conversation",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteConversation = async (id: string) => {
    try {
      const { error } = await supabase
        .from('conversations')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setConversations(conversations.filter(c => c.id !== id));
      
      if (currentConversation?.id === id) {
        const newCurrentConversation = conversations.find(c => c.id !== id);
        setCurrentConversation(newCurrentConversation || null);
        
        if (newCurrentConversation) {
          fetchMessages(newCurrentConversation.id);
        } else {
          setMessages([]);
        }
      }
      
      toast({
        title: "Success",
        description: "Conversation deleted",
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Error deleting conversation",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      return false;
    }
  };

  const sendMessage = async (content: string, isUser = true) => {
    if (!currentConversation) return null;

    try {
      const message = {
        content,
        conversation_id: currentConversation.id,
        is_user: isUser,
      };
      
      // Update conversation timestamp
      await supabase
        .from('conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', currentConversation.id);
      
      // Insert message
      const { data, error } = await supabase
        .from('messages')
        .insert(message)
        .select()
        .single();
        
      if (error) throw error;
      
      // Add to local messages
      setMessages([...messages, { ...data, reactions: [] }]);
      
      // Update conversations list order
      setConversations(conversations.map(c => 
        c.id === currentConversation.id 
          ? { ...c, updated_at: new Date().toISOString() } 
          : c
      ).sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()));
      
      return data;
    } catch (error) {
      toast({
        title: "Error sending message",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateMessage = async (messageId: string, content: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ content })
        .eq('id', messageId);
        
      if (error) throw error;
      
      // Update local state
      setMessages(messages.map(m => 
        m.id === messageId ? { ...m, content } : m
      ));
      
      return true;
    } catch (error) {
      toast({
        title: "Error updating message",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      return false;
    }
  };

  const addReaction = async (messageId: string, reactionType: string) => {
    if (!user?.id) return false;
    
    try {
      // Check if user already reacted with this type
      const message = messages.find(m => m.id === messageId);
      const existingReaction = message?.reactions?.find(r => 
        r.user_id === user.id && r.type === reactionType
      );
      
      if (existingReaction) {
        // Remove the reaction if it already exists
        await supabase
          .from('message_reactions')
          .delete()
          .eq('id', existingReaction.id);
          
        setMessages(messages.map(m => {
          if (m.id === messageId) {
            return {
              ...m,
              reactions: m.reactions?.filter(r => r.id !== existingReaction.id) || []
            };
          }
          return m;
        }));
      } else {
        // Add new reaction
        const newReaction = {
          message_id: messageId,
          user_id: user.id,
          type: reactionType
        };
        
        const { data, error } = await supabase
          .from('message_reactions')
          .insert(newReaction)
          .select()
          .single();
          
        if (error) throw error;
        
        // Update local state
        setMessages(messages.map(m => {
          if (m.id === messageId) {
            return {
              ...m,
              reactions: [...(m.reactions || []), data]
            };
          }
          return m;
        }));
      }
      
      return true;
    } catch (error) {
      toast({
        title: "Error adding reaction",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    conversations,
    currentConversation,
    messages,
    isLoading,
    selectConversation,
    createConversation,
    updateConversationTitle,
    deleteConversation,
    sendMessage,
    updateMessage,
    addReaction
  };
}
