
import React, { useState } from "react";
import { Message } from "@/hooks/use-conversations";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Pencil, Check, X, Smile } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MessageItemProps {
  message: Message;
  onUpdateMessage?: (messageId: string, content: string) => Promise<void>;
  onAddReaction?: (messageId: string, reactionType: string) => Promise<void>;
}

const reactionEmojis = [
  { type: "👍", label: "Thumbs up" },
  { type: "❤️", label: "Heart" },
  { type: "😄", label: "Smile" },
  { type: "😮", label: "Wow" },
  { type: "😢", label: "Sad" },
  { type: "🔥", label: "Fire" },
];

const MessageItem: React.FC<MessageItemProps> = ({ 
  message, 
  onUpdateMessage,
  onAddReaction
}) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(message.content);

  const handleStartEditing = () => {
    if (!message.is_user) return; // Only allow editing user's messages
    setEditedContent(message.content);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(message.content);
  };

  const handleSaveEdit = async () => {
    if (onUpdateMessage && editedContent !== message.content) {
      await onUpdateMessage(message.id, editedContent);
    }
    setIsEditing(false);
  };

  const handleReaction = async (type: string) => {
    if (!onAddReaction) return;
    await onAddReaction(message.id, type);
  };

  // Group reactions by type to count them
  const reactionCounts = message.reactions?.reduce((acc, reaction) => {
    acc[reaction.type] = (acc[reaction.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  // Check if the current user has reacted with a specific type
  const hasReacted = (type: string) => {
    return message.reactions?.some(r => r.user_id === user?.id && r.type === type) || false;
  };

  return (
    <div className={cn(
      "flex flex-col max-w-[80%] rounded-lg p-3 mb-2",
      message.is_user ? "bg-primary text-primary-foreground ml-auto" : "bg-muted mr-auto"
    )}>
      {isEditing ? (
        <div className="space-y-2">
          <Textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className={cn(
              "min-h-[60px] border-0",
              message.is_user ? "bg-primary/80 text-primary-foreground" : "bg-muted-foreground/10"
            )}
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={handleCancelEdit}
              className="p-1 rounded-full hover:bg-muted-foreground/20"
            >
              <X className="h-4 w-4" />
            </button>
            <button
              onClick={handleSaveEdit}
              className="p-1 rounded-full hover:bg-muted-foreground/20"
            >
              <Check className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="relative">
            <div className="whitespace-pre-wrap">{message.content}</div>
            
            {message.is_user && onUpdateMessage && (
              <button
                onClick={handleStartEditing}
                className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 hover:bg-muted-foreground/20 rounded-full transition-opacity"
              >
                <Pencil className="h-3 w-3" />
              </button>
            )}
          </div>
          
          <div className="text-xs opacity-70 mt-1">
            {format(new Date(message.created_at), 'MMM d, h:mm a')}
          </div>
          
          {/* Reaction counts display */}
          {Object.keys(reactionCounts).length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {Object.entries(reactionCounts).map(([type, count]) => (
                <button
                  key={type}
                  className={cn(
                    "text-xs px-1.5 py-0.5 rounded-full flex items-center gap-1",
                    hasReacted(type) 
                      ? message.is_user 
                        ? "bg-white/30" 
                        : "bg-primary/20" 
                      : message.is_user 
                        ? "bg-white/10 hover:bg-white/30" 
                        : "bg-muted-foreground/10 hover:bg-primary/20"
                  )}
                  onClick={() => handleReaction(type)}
                >
                  <span>{type}</span>
                  {count > 1 && <span>{count}</span>}
                </button>
              ))}
            </div>
          )}
          
          {/* Reaction button */}
          {onAddReaction && (
            <div className="mt-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button 
                    className={cn(
                      "text-xs flex items-center gap-1 opacity-60 hover:opacity-100",
                      message.is_user ? "text-primary-foreground" : "text-foreground"
                    )}
                  >
                    <Smile className="h-3 w-3" />
                    <span>React</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <div className="flex p-1 gap-1">
                    {reactionEmojis.map((emoji) => (
                      <DropdownMenuItem 
                        key={emoji.type} 
                        className="cursor-pointer p-1 hover:bg-muted text-lg"
                        onClick={() => handleReaction(emoji.type)}
                      >
                        {emoji.type}
                      </DropdownMenuItem>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MessageItem;
