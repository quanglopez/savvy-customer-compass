
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCcw, Search, PlusCircle, MessageSquare } from "lucide-react";
import { 
  Dialog, 
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Conversation } from "@/hooks/use-conversations";
import ConversationItem from "./ConversationItem";
import CreateConversationDialog from "./CreateConversationDialog";

interface ConversationsListProps {
  conversations: Conversation[];
  selectedChatId: string | null;
  isLoading: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onRename: (id: string, title: string) => void;
  onCreateConversation: (title: string) => void;
}

const ConversationsList: React.FC<ConversationsListProps> = ({
  conversations,
  selectedChatId,
  isLoading,
  onSelect,
  onDelete,
  onRename,
  onCreateConversation,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingTitle, setEditingTitle] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newConversationTitle, setNewConversationTitle] = useState("");
  
  const handleUpdateTitle = () => {
    if (editingTitle && newTitle.trim()) {
      onRename(editingTitle, newTitle);
      setEditingTitle(null);
      setNewTitle("");
    }
  };

  const handleCreateConversation = () => {
    if (newConversationTitle.trim()) {
      onCreateConversation(newConversationTitle);
      setNewConversationTitle("");
    }
  };

  const filteredConversations = conversations
    .filter(conv => conv.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">Hội thoại</h3>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex space-x-2">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm kiếm hội thoại..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="icon" variant="outline">
                <PlusCircle className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <CreateConversationDialog 
              title={newConversationTitle} 
              onTitleChange={setNewConversationTitle} 
              onSubmit={handleCreateConversation} 
            />
          </Dialog>
        </div>
      </div>
      <div className="p-3 border-b">
        <Select 
          defaultValue="all"
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="h-8">
            <SelectValue placeholder="Lọc theo trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả hội thoại</SelectItem>
            <SelectItem value="active">Đang hoạt động</SelectItem>
            <SelectItem value="pending">Đang chờ</SelectItem>
            <SelectItem value="resolved">Đã giải quyết</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-auto h-[calc(100vh-18rem)]">
        {isLoading ? (
          <div className="flex justify-center p-4">Đang tải...</div>
        ) : filteredConversations.length > 0 ? (
          <div className="p-3 space-y-3">
            {filteredConversations.map((conversation) => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
                selectedChatId={selectedChatId}
                editingTitle={editingTitle}
                newTitle={newTitle}
                onSelect={onSelect}
                onDelete={(id) => {
                  onDelete(id);
                }}
                onStartEditing={(id, title) => {
                  setEditingTitle(id);
                  setNewTitle(title);
                }}
                onCancelEditing={() => setEditingTitle(null)}
                onTitleChange={setNewTitle}
                onUpdateTitle={handleUpdateTitle}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground mb-2" />
            {searchQuery ? (
              <p className="text-muted-foreground">Không tìm thấy hội thoại phù hợp</p>
            ) : (
              <>
                <p className="text-muted-foreground mb-4">Chưa có hội thoại nào</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <PlusCircle className="h-4 w-4 mr-2" /> Tạo hội thoại
                    </Button>
                  </DialogTrigger>
                  <CreateConversationDialog 
                    title={newConversationTitle} 
                    onTitleChange={setNewConversationTitle} 
                    onSubmit={handleCreateConversation} 
                  />
                </Dialog>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ConversationsList;
