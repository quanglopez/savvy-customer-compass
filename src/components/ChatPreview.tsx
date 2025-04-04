
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Bot, MessagesSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: string;
}

export interface ChatSession {
  id: string;
  customer: {
    name: string;
    avatar?: string;
  };
  status: "active" | "resolved" | "pending";
  lastActive: string;
  platform: "web" | "facebook" | "whatsapp" | "telegram";
  messages: Message[];
}

interface ChatPreviewProps {
  chat: ChatSession;
  onClick?: () => void;
  active?: boolean;
}

export function ChatPreview({ chat, onClick, active }: ChatPreviewProps) {
  const lastMessage = chat.messages[chat.messages.length - 1];
  
  const platformIcon = {
    web: <Globe className="h-3 w-3" />,
    facebook: <Facebook className="h-3 w-3" />,
    whatsapp: <MessageSquare className="h-3 w-3" />,
    telegram: <Send className="h-3 w-3" />,
  };

  const statusColors = {
    active: "bg-green-500",
    resolved: "bg-blue-500",
    pending: "bg-yellow-500",
  };

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all hover:shadow border-l-2", 
        active ? "border-l-primary bg-accent/50" : "border-l-transparent"
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={chat.customer.avatar} alt={chat.customer.name} />
              <AvatarFallback>{chat.customer.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center">
                <h4 className="font-medium text-sm">{chat.customer.name}</h4>
                <span className={cn("ml-2 h-2 w-2 rounded-full", statusColors[chat.status])}></span>
              </div>
              <div className="flex items-center text-xs text-muted-foreground mt-0.5">
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {chat.lastActive}
                </span>
                <span className="mx-1">•</span>
                <span className="flex items-center">
                  {chat.platform in platformIcon ? platformIcon[chat.platform] : 
                    <Globe className="h-3 w-3 mr-1" />}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center text-xs">
            <span className={cn(
              "px-2 py-0.5 rounded-full text-xs",
              chat.status === "active" ? "bg-green-100 text-green-800" : 
              chat.status === "resolved" ? "bg-blue-100 text-blue-800" : 
              "bg-yellow-100 text-yellow-800"
            )}>
              {chat.status === "active" ? "Đang hoạt động" : 
               chat.status === "resolved" ? "Đã giải quyết" : "Đang chờ"}
            </span>
          </div>
        </div>
        
        <div className="mt-3 text-sm">
          <div className="flex items-start">
            {lastMessage.sender === "bot" ? (
              <Bot className="h-4 w-4 mr-2 mt-0.5 text-primary" />
            ) : (
              <MessagesSquare className="h-4 w-4 mr-2 mt-0.5 text-secondary" />
            )}
            <p className="text-muted-foreground line-clamp-1">
              {lastMessage.text}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Globe(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function Facebook(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function Send(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

export default ChatPreview;
