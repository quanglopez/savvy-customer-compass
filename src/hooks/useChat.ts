
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface ChatMessage {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  isBot: boolean;
  status: 'sending' | 'sent' | 'delivered' | 'read' | 'error';
}

interface UseChatProps {
  chatId?: string;
  businessId?: string;
}

export const useChat = ({ chatId, businessId }: UseChatProps = {}) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentChatId, setCurrentChatId] = useState<string | undefined>(chatId);

  const fetchMessages = useCallback(async () => {
    if (!currentChatId || !user) return;
    
    setIsLoading(true);
    try {
      // Sử dụng Supabase để lấy tin nhắn từ bảng messages
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', currentChatId)
        .order('created_at', { ascending: true });

      if (error) {
        throw error;
      }

      if (data) {
        // Chuyển đổi dữ liệu từ DB sang định dạng phù hợp với giao diện
        const formattedMessages: ChatMessage[] = data.map(msg => ({
          id: msg.id,
          content: msg.content,
          // Since 'sender' doesn't exist in the database, determine it from is_user
          sender: msg.is_user ? (user?.id || '') : 'bot',
          timestamp: new Date(msg.created_at),
          isBot: !msg.is_user,
          status: 'sent', // Giả định tất cả tin nhắn đã được gửi
        }));
        
        setMessages(formattedMessages);
      }
    } catch (err) {
      console.error('Lỗi khi tải tin nhắn:', err);
      setError('Không thể tải tin nhắn. Vui lòng thử lại sau.');
      toast.error('Không thể tải tin nhắn');
    } finally {
      setIsLoading(false);
    }
  }, [currentChatId, user]);

  // Lấy tin nhắn khi component được render hoặc khi chatId thay đổi
  useEffect(() => {
    if (chatId !== currentChatId) {
      setCurrentChatId(chatId);
    }
    
    if (currentChatId) {
      fetchMessages();
    }
  }, [currentChatId, chatId, fetchMessages]);

  // Thiết lập subscription để lắng nghe tin nhắn mới
  useEffect(() => {
    if (!currentChatId) return;
    
    const subscription = supabase
      .channel(`messages:${currentChatId}`)
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'messages',
          filter: `conversation_id=eq.${currentChatId}`
        },
        (payload) => {
          const newMessage = payload.new as any;
          
          // Chuyển đổi tin nhắn mới thành định dạng phù hợp
          const formattedMessage: ChatMessage = {
            id: newMessage.id,
            content: newMessage.content,
            sender: newMessage.is_user ? (user?.id || '') : 'bot',
            timestamp: new Date(newMessage.created_at),
            isBot: !newMessage.is_user,
            status: 'sent',
          };
          
          // Thêm tin nhắn mới vào danh sách
          setMessages(prev => {
            // Kiểm tra nếu tin nhắn đã tồn tại (tránh trùng lặp)
            if (prev.some(msg => msg.id === formattedMessage.id)) {
              return prev;
            }
            return [...prev, formattedMessage];
          });
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(subscription);
    };
  }, [currentChatId, user]);

  // Gửi tin nhắn mới
  const sendMessage = async (content: string) => {
    if (!user) {
      toast.error('Bạn cần đăng nhập để gửi tin nhắn');
      return;
    }
    
    // Tạo một tin nhắn tạm thời với trạng thái 'sending'
    const tempId = `temp-${Date.now()}`;
    const tempMessage: ChatMessage = {
      id: tempId,
      content,
      sender: user.id,
      timestamp: new Date(),
      isBot: false,
      status: 'sending',
    };
    
    // Thêm tin nhắn tạm thời vào danh sách
    setMessages(prev => [...prev, tempMessage]);
    
    try {
      // Nếu chưa có cuộc trò chuyện, tạo mới
      let newChatId = currentChatId;
      if (!newChatId) {
        if (!businessId) {
          throw new Error('Thiếu thông tin doanh nghiệp');
        }
        
        // Tạo cuộc trò chuyện mới
        const { data: chatData, error: chatError } = await supabase
          .from('conversations')
          .insert([
            { 
              user_id: user.id,
              title: `Hội thoại ${new Date().toLocaleDateString()}`,
            }
          ])
          .select()
          .single();
          
        if (chatError) throw chatError;
        
        newChatId = chatData.id;
        setCurrentChatId(newChatId);
      }
      
      // Gửi tin nhắn thông qua Supabase
      const { data, error } = await supabase
        .from('messages')
        .insert([
          {
            content,
            conversation_id: newChatId,
            is_user: true,
          }
        ])
        .select()
        .single();
      
      if (error) throw error;
      
      // Cập nhật tin nhắn tạm thời với ID thật và trạng thái 'sent'
      setMessages(prev => 
        prev.map(msg => 
          msg.id === tempId
            ? {
                ...msg,
                id: data.id,
                status: 'sent',
              }
            : msg
        )
      );
      
      // Cập nhật thời gian của cuộc trò chuyện
      if (newChatId) {
        await supabase
          .from('conversations')
          .update({ updated_at: new Date().toISOString() })
          .eq('id', newChatId);
      }
      
      return data.id;
    } catch (err) {
      console.error('Lỗi khi gửi tin nhắn:', err);
      
      // Cập nhật trạng thái tin nhắn thành 'error'
      setMessages(prev => 
        prev.map(msg => 
          msg.id === tempId
            ? { ...msg, status: 'error' }
            : msg
        )
      );
      
      toast.error('Không thể gửi tin nhắn. Vui lòng thử lại.');
      return null;
    }
  };

  // Xóa một tin nhắn
  const deleteMessage = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', messageId);
        
      if (error) throw error;
      
      // Xóa tin nhắn khỏi danh sách
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
      toast.success('Đã xóa tin nhắn');
    } catch (err) {
      console.error('Lỗi khi xóa tin nhắn:', err);
      toast.error('Không thể xóa tin nhắn');
    }
  };

  // Tạo cuộc trò chuyện mới
  const createNewChat = async (title?: string) => {
    if (!user) {
      toast.error('Bạn cần đăng nhập để tạo cuộc trò chuyện');
      return null;
    }
    
    try {
      const { data, error } = await supabase
        .from('conversations')
        .insert([
          { 
            user_id: user.id,
            title: title || `Hội thoại ${new Date().toLocaleDateString()}`,
          }
        ])
        .select()
        .single();
        
      if (error) throw error;
      
      setCurrentChatId(data.id);
      setMessages([]);
      return data.id;
    } catch (err) {
      console.error('Lỗi khi tạo cuộc trò chuyện mới:', err);
      toast.error('Không thể tạo cuộc trò chuyện mới');
      return null;
    }
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    deleteMessage,
    fetchMessages,
    createNewChat,
    chatId: currentChatId,
  };
};
