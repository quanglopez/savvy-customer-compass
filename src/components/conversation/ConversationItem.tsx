
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoreVertical, Edit, Trash2, CheckCircle, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Conversation } from "@/hooks/use-conversations";

interface ConversationItemProps {
  conversation: Conversation;
  selectedChatId: string | null;
  editingTitle: string | null;
  newTitle: string;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onStartEditing: (id: string, title: string) => void;
  onCancelEditing: () => void;
  onTitleChange: (title: string) => void;
  onUpdateTitle: () => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  selectedChatId,
  editingTitle,
  newTitle,
  onSelect,
  onDelete,
  onStartEditing,
  onCancelEditing,
  onTitleChange,
  onUpdateTitle,
}) => {
  return (
    <div 
      key={conversation.id} 
      className={`p-3 rounded-md cursor-pointer border transition-all flex justify-between items-center ${
        selectedChatId === conversation.id
          ? "bg-primary/10 border-primary"
          : "hover:bg-muted border-transparent"
      }`}
      onClick={() => onSelect(conversation.id)}
    >
      <div className="flex-1 min-w-0">
        {editingTitle === conversation.id ? (
          <div className="flex items-center gap-2">
            <Input
              value={newTitle}
              onChange={(e) => onTitleChange(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              autoFocus
            />
            <Button 
              size="sm" 
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onUpdateTitle();
              }}
            >
              <CheckCircle className="h-4 w-4 text-green-500" />
            </Button>
            <Button 
              size="sm" 
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onCancelEditing();
              }}
            >
              <X className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        ) : (
          <>
            <h4 className="font-medium truncate">{conversation.title}</h4>
            <p className="text-xs text-muted-foreground">
              {new Date(conversation.updated_at).toLocaleString()}
            </p>
          </>
        )}
      </div>
      
      {editingTitle !== conversation.id && (
        <div onClick={(e) => e.stopPropagation()}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onStartEditing(conversation.id, conversation.title)}>
                <Edit className="h-4 w-4 mr-2" /> Đổi tên
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-500"
                onClick={() => {
                  if (confirm("Bạn có chắc chắn muốn xóa hội thoại này?")) {
                    onDelete(conversation.id);
                  }
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" /> Xóa
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};

export default ConversationItem;
