
import React, { useRef, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import { Message } from "@/hooks/use-conversations";
import MessageItem from "./MessageItem";

interface MessagesListProps {
  messages: Message[];
  isLoading: boolean;
}

const MessagesList: React.FC<MessagesListProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  return (
    <div className="flex-grow overflow-auto p-4 space-y-4">
      {isLoading ? (
        <div className="flex justify-center p-4">Đang tải tin nhắn...</div>
      ) : messages.length > 0 ? (
        <>
          {messages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <MessageSquare className="h-12 w-12 text-muted-foreground mb-2" />
          <p className="text-xl font-medium mb-2">Bắt đầu cuộc trò chuyện</p>
          <p className="text-muted-foreground mb-4">
            Hãy gửi tin nhắn đầu tiên để bắt đầu cuộc trò chuyện
          </p>
        </div>
      )}
    </div>
  );
};

export default MessagesList;
