
import React, { useState, useRef, useEffect } from "react";
import { Bot, User, ThumbsUp, Heart, Laugh, Edit, Save, X, MoreHorizontal } from "lucide-react";
import { Message } from "@/hooks/use-conversations";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

interface MessageItemProps {
  message: Message;
  onUpdateMessage?: (messageId: string, content: string) => Promise<void>;
  onAddReaction?: (messageId: string, reactionType: string) => Promise<void>;
}

interface Reaction {
  type: string;
  icon: React.ReactNode;
  label: string;
}

const reactions: Reaction[] = [
  { type: "thumbs-up", icon: <ThumbsUp className="h-4 w-4" />, label: "Thích" },
  { type: "heart", icon: <Heart className="h-4 w-4" />, label: "Yêu thích" },
  { type: "laugh", icon: <Laugh className="h-4 w-4" />, label: "Haha" },
];

const MessageItem: React.FC<MessageItemProps> = ({ 
  message, 
  onUpdateMessage,
  onAddReaction,
}) => {
  const { user, userProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(message.content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Set focus on the textarea when editing starts
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      // Move cursor to end of text
      const length = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(length, length);
    }
  }, [isEditing]);
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleSave = async () => {
    if (editedContent.trim() === "") return;
    if (onUpdateMessage) {
      await onUpdateMessage(message.id, editedContent);
    }
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setEditedContent(message.content);
    setIsEditing(false);
  };
  
  const handleReaction = async (reactionType: string) => {
    if (onAddReaction) {
      await onAddReaction(message.id, reactionType);
    }
  };
  
  // Get the first letter of the username for avatar fallback
  const getInitial = () => {
    if (message.is_user && userProfile?.username) {
      return userProfile.username.charAt(0).toUpperCase();
    }
    return message.is_user ? "U" : "B";
  };
  
  return (
    <div
      className={`flex ${
        message.is_user ? "justify-end" : "justify-start"
      } mb-4`}
    >
      <div
        className={`max-w-[80%] rounded-lg ${
          message.is_user
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        }`}
      >
        <div className="flex items-center p-2">
          <Avatar className="h-8 w-8 mr-2">
            {message.is_user ? (
              <AvatarImage src={userProfile?.avatar_url || ""} />
            ) : (
              <AvatarImage src="/bot-avatar.png" />
            )}
            <AvatarFallback>
              {getInitial()}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium">
                {message.is_user ? userProfile?.username || "Bạn" : "Chatbot"}
              </span>
              <span className="text-xs opacity-70 ml-2">
                {new Date(message.created_at).toLocaleTimeString()}
              </span>
            </div>
            
            {isEditing ? (
              <div className="mt-1">
                <Textarea
                  ref={textareaRef}
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="min-h-[60px] text-sm mb-2 bg-background/50 text-foreground"
                />
                <div className="flex justify-end gap-2">
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={handleCancel}
                    className="h-8 px-2 text-xs"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Huỷ
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={handleSave}
                    className="h-8 px-2 text-xs"
                  >
                    <Save className="h-3 w-3 mr-1" />
                    Lưu
                  </Button>
                </div>
              </div>
            ) : (
              <p className="whitespace-pre-wrap">{message.content}</p>
            )}
          </div>
          
          {message.is_user && !isEditing && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-36">
                <DropdownMenuItem onClick={handleEdit}>
                  <Edit className="h-4 w-4 mr-2" />
                  Chỉnh sửa
                </DropdownMenuItem>
                {reactions.map((reaction) => (
                  <DropdownMenuItem 
                    key={reaction.type}
                    onClick={() => handleReaction(reaction.type)}
                  >
                    <div className="mr-2">{reaction.icon}</div>
                    {reaction.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        
        {/* Add reaction display here if needed */}
      </div>
    </div>
  );
};

export default MessageItem;
