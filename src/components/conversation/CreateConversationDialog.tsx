
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter, 
} from "@/components/ui/dialog";

interface CreateConversationDialogProps {
  title: string;
  onTitleChange: (title: string) => void;
  onSubmit: () => void;
}

const CreateConversationDialog: React.FC<CreateConversationDialogProps> = ({
  title,
  onTitleChange,
  onSubmit,
}) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Tạo hội thoại mới</DialogTitle>
      </DialogHeader>
      <div className="py-4">
        <Input
          placeholder="Nhập tiêu đề hội thoại..."
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
        />
      </div>
      <DialogFooter>
        <Button onClick={onSubmit}>Tạo</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default CreateConversationDialog;
