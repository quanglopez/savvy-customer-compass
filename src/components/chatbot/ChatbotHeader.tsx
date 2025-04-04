
import React from "react";
import { Button } from "@/components/ui/button";
import { Bot, Zap } from "lucide-react";

interface ChatbotHeaderProps {
  onTest: () => void;
  onPublish: () => void;
}

export function ChatbotHeader({ onTest, onPublish }: ChatbotHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold">Xây dựng chatbot</h2>
        <p className="text-muted-foreground">
          Thiết kế luồng hội thoại và cấu hình chatbot của bạn
        </p>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" onClick={onTest}>
          <Bot className="mr-2 h-4 w-4" />
          Kiểm thử
        </Button>
        <Button onClick={onPublish}>
          <Zap className="mr-2 h-4 w-4" />
          Xuất bản
        </Button>
      </div>
    </div>
  );
}
