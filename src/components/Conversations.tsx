
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  ArrowUpRight,
  Bot,
  Filter,
  MessageSquare,
  MoreVertical,
  PlusCircle,
  RefreshCcw,
  Search,
  Send,
  Trash2,
  Edit,
  User,
  X,
  CheckCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ChatPreview, { ChatSession } from "./ChatPreview";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter, 
  DialogTrigger 
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConversations, Message } from "@/hooks/use-conversations";
import { toast } from "sonner";

export function Conversations() {
  const {
    conversations,
    isLoadingConversations,
    getMessages,
    createConversation,
    deleteConversation,
    renameConversation,
    addMessage,
    subscribeToMessages,
  } = useConversations();
  
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [newConversationTitle, setNewConversationTitle] = useState("");
  const [editingTitle, setEditingTitle] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Find the selected conversation
  const selectedChat = conversations.find(c => c.id === selectedChatId);

  // Load messages when a conversation is selected
  useEffect(() => {
    if (selectedChatId) {
      setLoading(true);
      getMessages(selectedChatId)
        .then(loadedMessages => {
          setMessages(loadedMessages);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setMessages([]);
    }
  }, [selectedChatId, getMessages]);

  // Setup real-time message subscription
  useEffect(() => {
    if (!selectedChatId) return;
    
    const unsubscribe = subscribeToMessages(selectedChatId, (newMessage) => {
      setMessages(prevMessages => {
        // Check if the message already exists
        if (prevMessages.some(msg => msg.id === newMessage.id)) {
          return prevMessages;
        }
        return [...prevMessages, newMessage];
      });
    });
    
    return () => {
      unsubscribe();
    };
  }, [selectedChatId, subscribeToMessages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!messageText.trim() || !selectedChatId) return;
    
    try {
      addMessage({
        conversationId: selectedChatId,
        content: messageText,
        isUser: true,
      });
      setMessageText("");
      
      // Simulate bot response (in a real app, this would be from your AI)
      setTimeout(() => {
        addMessage({
          conversationId: selectedChatId,
          content: "Đây là tin nhắn tự động. Trong ứng dụng thực tế, đây sẽ là phản hồi từ trí tuệ nhân tạo.",
          isUser: false,
        });
      }, 1000);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleCreateConversation = () => {
    if (!newConversationTitle.trim()) {
      toast.error("Vui lòng nhập tiêu đề hội thoại");
      return;
    }
    
    createConversation(newConversationTitle);
    setNewConversationTitle("");
  };

  const handleUpdateTitle = () => {
    if (editingTitle && newTitle.trim()) {
      renameConversation({ id: editingTitle, title: newTitle });
      setEditingTitle(null);
      setNewTitle("");
    }
  };

  const filteredConversations = conversations
    .filter(conv => conv.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="animate-fade-in h-[calc(100vh-12rem)]">
      <div className="flex h-full rounded-lg overflow-hidden">
        <div className="w-1/3 border-r">
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
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Tạo hội thoại mới</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <Input
                      placeholder="Nhập tiêu đề hội thoại..."
                      value={newConversationTitle}
                      onChange={(e) => setNewConversationTitle(e.target.value)}
                    />
                  </div>
                  <DialogFooter>
                    <Button onClick={handleCreateConversation}>Tạo</Button>
                  </DialogFooter>
                </DialogContent>
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
            {isLoadingConversations ? (
              <div className="flex justify-center p-4">Đang tải...</div>
            ) : filteredConversations.length > 0 ? (
              <div className="p-3 space-y-3">
                {filteredConversations.map((conversation) => (
                  <div 
                    key={conversation.id} 
                    className={`p-3 rounded-md cursor-pointer border transition-all flex justify-between items-center ${
                      selectedChatId === conversation.id
                        ? "bg-primary/10 border-primary"
                        : "hover:bg-muted border-transparent"
                    }`}
                    onClick={() => setSelectedChatId(conversation.id)}
                  >
                    <div className="flex-1 min-w-0">
                      {editingTitle === conversation.id ? (
                        <div className="flex items-center gap-2">
                          <Input
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            autoFocus
                          />
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUpdateTitle();
                            }}
                          >
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingTitle(null);
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
                            <DropdownMenuItem onClick={() => {
                              setEditingTitle(conversation.id);
                              setNewTitle(conversation.title);
                            }}>
                              <Edit className="h-4 w-4 mr-2" /> Đổi tên
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-500"
                              onClick={() => {
                                if (confirm("Bạn có chắc chắn muốn xóa hội thoại này?")) {
                                  deleteConversation(conversation.id);
                                  if (selectedChatId === conversation.id) {
                                    setSelectedChatId(null);
                                  }
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
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Tạo hội thoại mới</DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                          <Input
                            placeholder="Nhập tiêu đề hội thoại..."
                            value={newConversationTitle}
                            onChange={(e) => setNewConversationTitle(e.target.value)}
                          />
                        </div>
                        <DialogFooter>
                          <Button onClick={handleCreateConversation}>Tạo</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="w-2/3 flex flex-col h-full">
          {selectedChat ? (
            <>
              <div className="p-4 border-b flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium mr-3">
                    {selectedChat.title.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-medium">{selectedChat.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {new Date(selectedChat.updated_at).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      setEditingTitle(selectedChat.id);
                      setNewTitle(selectedChat.title);
                    }}
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
                        deleteConversation(selectedChat.id);
                        setSelectedChatId(null);
                      }
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Xóa
                  </Button>
                </div>
              </div>

              <div className="flex-grow overflow-auto p-4 space-y-4">
                {loading ? (
                  <div className="flex justify-center p-4">Đang tải tin nhắn...</div>
                ) : messages.length > 0 ? (
                  <>
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.is_user ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            msg.is_user
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <div className="flex items-center mb-1">
                            <div className="flex items-center">
                              {msg.is_user ? (
                                <User className="h-3 w-3 mr-1" />
                              ) : (
                                <Bot className="h-3 w-3 mr-1" />
                              )}
                              <span className="text-xs font-medium">
                                {msg.is_user ? "Bạn" : "Chatbot"}
                              </span>
                            </div>
                            <span className="text-xs ml-2 opacity-70">
                              {new Date(msg.created_at).toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mb-2" />
                    <p className="text-xl font-medium mb-2">Bắt đầu cuộc trò chuyện</p>
                    <p className="text-muted-foreground mb-4">
                      Hãy gửi tin nhắn đầu tiên để bắt đầu cuộc trò chuyện
                    </p>
                  </div>
                )}
              </div>

              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Nhập tin nhắn..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="flex-grow"
                  />
                  <Button
                    disabled={!messageText.trim()}
                    onClick={handleSendMessage}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Gửi
                  </Button>
                </div>
              </div>
            </>
          ) : (
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
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Tạo hội thoại mới</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <Input
                        placeholder="Nhập tiêu đề hội thoại..."
                        value={newConversationTitle}
                        onChange={(e) => setNewConversationTitle(e.target.value)}
                      />
                    </div>
                    <DialogFooter>
                      <Button onClick={handleCreateConversation}>Tạo</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Conversations;
