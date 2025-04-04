
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, MessageSquare } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CreateConversationDialog from "./CreateConversationDialog";

interface EmptyConversationProps {
  newConversationTitle: string;
  onTitleChange: (title: string) => void;
  onCreateConversation: () => void;
}

const EmptyConversation: React.FC<EmptyConversationProps> = ({
  newConversationTitle,
  onTitleChange,
  onCreateConversation,
}) => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
        <h3 className="text-lg font-medium">Không có hội thoại nào được chọn</h3>
        <p className="text-muted-foreground mb-4">
          Chọn một hội thoại từ danh sách bên trái hoặc tạo hội thoại mới để bắt đầu.
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" /> Tạo hội thoại mới
            </Button>
          </DialogTrigger>
          <CreateConversationDialog
            title={newConversationTitle}
            onTitleChange={onTitleChange}
            onSubmit={onCreateConversation}
          />
        </Dialog>
      </div>
    </div>
  );
};

export default EmptyConversation;
