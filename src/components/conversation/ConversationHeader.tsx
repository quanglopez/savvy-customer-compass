
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Conversation } from "@/hooks/use-conversations";

interface ConversationHeaderProps {
  conversation: Conversation;
  onEdit: (id: string, title: string) => void;
  onDelete: (id: string) => void;
}

const ConversationHeader: React.FC<ConversationHeaderProps> = ({
  conversation,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="p-4 border-b flex justify-between items-center">
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium mr-3">
          {conversation.title.substring(0, 2).toUpperCase()}
        </div>
        <div>
          <h3 className="font-medium">{conversation.title}</h3>
          <p className="text-xs text-muted-foreground">
            {new Date(conversation.updated_at).toLocaleString()}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          size="sm" 
          variant="outline"
          onClick={() => onEdit(conversation.id, conversation.title)}
        >
          <Edit className="mr-2 h-4 w-4" />
          Đổi tên
        </Button>
        <Button 
          size="sm" 
          variant="outline"
          className="text-red-500"
          onClick={() => {
            if (confirm("Bạn có chắc chắn muốn xóa hội thoại này?")) {
              onDelete(conversation.id);
            }
          }}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Xóa
        </Button>
      </div>
    </div>
  );
};

export default ConversationHeader;
