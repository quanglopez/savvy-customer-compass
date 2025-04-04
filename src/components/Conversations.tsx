
import React, { useState, useEffect } from "react";
import { useConversations, Message } from "@/hooks/use-conversations";
import { toast } from "sonner";
import ConversationsList from "./conversation/ConversationsList";
import ConversationHeader from "./conversation/ConversationHeader";
import MessagesList from "./conversation/MessagesList";
import MessageInput from "./conversation/MessageInput";
import EmptyConversation from "./conversation/EmptyConversation";

export function Conversations() {
  const {
    conversations,
    isLoadingConversations,
    getMessages,
    createConversation,
    deleteConversation,
    renameConversation,
    addMessage,
    updateMessage,
    addReaction,
    subscribeToMessages,
  } = useConversations();
  
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [newConversationTitle, setNewConversationTitle] = useState("");
  
  // Find the selected conversation
  const selectedChat = conversations.find(c => c.id === selectedChatId);

  // Load messages when a conversation is selected
  useEffect(() => {
    if (selectedChatId) {
      setLoading(true);
      getMessages(selectedChatId)
        .then(loadedMessages => {
          setMessages(loadedMessages);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setMessages([]);
    }
  }, [selectedChatId, getMessages]);

  // Setup real-time message subscription
  useEffect(() => {
    if (!selectedChatId) return;
    
    const unsubscribe = subscribeToMessages(selectedChatId, (newMessage) => {
      setMessages(prevMessages => {
        // Check if the message already exists
        if (prevMessages.some(msg => msg.id === newMessage.id)) {
          return prevMessages;
        }
        return [...prevMessages, newMessage];
      });
    });
    
    return () => {
      unsubscribe();
    };
  }, [selectedChatId, subscribeToMessages]);

  const handleSendMessage = async (content: string) => {
    if (!selectedChatId) return;
    
    try {
      addMessage({
        conversationId: selectedChatId,
        content,
        isUser: true,
      });
      
      // Simulate bot response (in a real app, this would be from your AI)
      setTimeout(() => {
        if (selectedChatId) {
          addMessage({
            conversationId: selectedChatId,
            content: "Đây là tin nhắn tự động. Trong ứng dụng thực tế, đây sẽ là phản hồi từ trí tuệ nhân tạo.",
            isUser: false,
          });
        }
      }, 1000);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleCreateConversation = (title: string) => {
    if (!title.trim()) {
      toast.error("Vui lòng nhập tiêu đề hội thoại");
      return;
    }
    
    createConversation(title);
  };

  const handleDeleteConversation = (id: string) => {
    deleteConversation(id);
    if (selectedChatId === id) {
      setSelectedChatId(null);
    }
  };

  const handleRenameConversation = (id: string, newTitle: string) => {
    if (newTitle.trim()) {
      renameConversation({ id, title: newTitle });
    }
  };
  
  const handleUpdateMessage = async (messageId: string, content: string) => {
    const success = await updateMessage(messageId, content);
    if (success) {
      // Update local state
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === messageId ? { ...msg, content } : msg
        )
      );
      toast.success("Tin nhắn đã được cập nhật");
    } else {
      toast.error("Không thể cập nhật tin nhắn");
    }
  };
  
  const handleAddReaction = async (messageId: string, reactionType: string) => {
    const success = await addReaction(messageId, reactionType);
    if (success) {
      toast.success("Đã thêm cảm xúc");
      // In a real app, you would fetch the updated messages here
      // or handle the reactions in real-time via subscription
    } else {
      toast.error("Không thể thêm cảm xúc");
    }
  };

  return (
    <div className="animate-fade-in h-[calc(100vh-12rem)]">
      <div className="flex h-full rounded-lg overflow-hidden">
        <div className="w-1/3 border-r">
          <ConversationsList 
            conversations={conversations}
            selectedChatId={selectedChatId}
            isLoading={isLoadingConversations}
            onSelect={setSelectedChatId}
            onDelete={handleDeleteConversation}
            onRename={handleRenameConversation}
            onCreateConversation={handleCreateConversation}
          />
        </div>

        <div className="w-2/3 flex flex-col h-full">
          {selectedChat ? (
            <>
              <ConversationHeader 
                conversation={selectedChat}
                onEdit={(id, title) => handleRenameConversation(id, title)}
                onDelete={handleDeleteConversation}
              />

              <MessagesList 
                messages={messages}
                isLoading={loading}
                onUpdateMessage={handleUpdateMessage}
                onAddReaction={handleAddReaction}
              />

              <MessageInput onSendMessage={handleSendMessage} />
            </>
          ) : (
            <EmptyConversation 
              newConversationTitle={newConversationTitle}
              onTitleChange={setNewConversationTitle}
              onCreateConversation={() => handleCreateConversation(newConversationTitle)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Conversations;
