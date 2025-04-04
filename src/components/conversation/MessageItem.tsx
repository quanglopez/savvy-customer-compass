
import React from "react";
import { Bot, User } from "lucide-react";
import { Message } from "@/hooks/use-conversations";

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  return (
    <div
      className={`flex ${
        message.is_user ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          message.is_user
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        }`}
      >
        <div className="flex items-center mb-1">
          <div className="flex items-center">
            {message.is_user ? (
              <User className="h-3 w-3 mr-1" />
            ) : (
              <Bot className="h-3 w-3 mr-1" />
            )}
            <span className="text-xs font-medium">
              {message.is_user ? "Bạn" : "Chatbot"}
            </span>
          </div>
          <span className="text-xs ml-2 opacity-70">
            {new Date(message.created_at).toLocaleTimeString()}
          </span>
        </div>
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
};

export default MessageItem;
