
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowUpRight,
  Bot,
  Filter,
  MessageSquare,
  RefreshCcw,
  Search,
  Send,
  User,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ChatPreview, { ChatSession } from "./ChatPreview";

const dummyChats: ChatSession[] = [
  {
    id: "1",
    customer: {
      name: "Nguyễn Văn A",
      avatar: "",
    },
    status: "active",
    lastActive: "1 phút trước",
    platform: "web",
    messages: [
      {
        id: "m1",
        text: "Tôi cần trợ giúp về sản phẩm X",
        sender: "user",
        timestamp: "09:45",
      },
      {
        id: "m2",
        text: "Xin chào! Tôi rất vui được hỗ trợ bạn. Bạn cần thông tin gì về sản phẩm X?",
        sender: "bot",
        timestamp: "09:46",
      },
    ],
  },
  {
    id: "2",
    customer: {
      name: "Trần Thị B",
      avatar: "",
    },
    status: "pending",
    lastActive: "10 phút trước",
    platform: "facebook",
    messages: [
      {
        id: "m3",
        text: "Làm thế nào để trả hàng?",
        sender: "user",
        timestamp: "09:35",
      },
      {
        id: "m4",
        text: "Để trả hàng, bạn cần giữ lại biên lai và liên hệ với bộ phận CSKH trong vòng 7 ngày kể từ ngày nhận hàng.",
        sender: "bot",
        timestamp: "09:36",
      },
    ],
  },
  {
    id: "3",
    customer: {
      name: "Lê Văn C",
      avatar: "",
    },
    status: "resolved",
    lastActive: "1 giờ trước",
    platform: "whatsapp",
    messages: [
      {
        id: "m5",
        text: "Đơn hàng của tôi khi nào được giao?",
        sender: "user",
        timestamp: "08:15",
      },
      {
        id: "m6",
        text: "Đơn hàng của bạn (mã #12345) đang được vận chuyển và dự kiến sẽ được giao vào ngày mai.",
        sender: "bot",
        timestamp: "08:16",
      },
    ],
  },
  {
    id: "4",
    customer: {
      name: "Phạm Văn D",
      avatar: "",
    },
    status: "active",
    lastActive: "5 phút trước",
    platform: "telegram",
    messages: [
      {
        id: "m7",
        text: "Tôi muốn hủy đơn hàng",
        sender: "user",
        timestamp: "09:40",
      },
      {
        id: "m8",
        text: "Để hủy đơn hàng, vui lòng cho tôi biết mã đơn hàng của bạn.",
        sender: "bot",
        timestamp: "09:41",
      },
    ],
  },
  {
    id: "5",
    customer: {
      name: "Hoàng Thị E",
      avatar: "",
    },
    status: "pending",
    lastActive: "15 phút trước",
    platform: "web",
    messages: [
      {
        id: "m9",
        text: "Sản phẩm của tôi bị lỗi",
        sender: "user",
        timestamp: "09:30",
      },
      {
        id: "m10",
        text: "Tôi rất tiếc về trải nghiệm này. Xin vui lòng mô tả chi tiết vấn đề bạn đang gặp phải.",
        sender: "bot",
        timestamp: "09:31",
      },
    ],
  },
];

export function Conversations() {
  const [selectedChat, setSelectedChat] = useState<ChatSession | null>(dummyChats[0]);
  const [message, setMessage] = useState("");

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
                />
              </div>
              <Button size="icon" variant="outline">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="p-3 border-b">
            <Select defaultValue="all">
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
            <div className="p-3 space-y-3">
              {dummyChats.map((chat) => (
                <ChatPreview
                  key={chat.id}
                  chat={chat}
                  active={selectedChat?.id === chat.id}
                  onClick={() => setSelectedChat(chat)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="w-2/3 flex flex-col h-full">
          {selectedChat ? (
            <>
              <div className="p-4 border-b flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium mr-3">
                    {selectedChat.customer.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-medium">{selectedChat.customer.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {selectedChat.lastActive} • {mapPlatform(selectedChat.platform)}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <ArrowUpRight className="mr-2 h-4 w-4" />
                    Chuyển tiếp
                  </Button>
                  <Select defaultValue={selectedChat.status}>
                    <SelectTrigger className="h-9 w-40">
                      <SelectValue placeholder="Trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Đang hoạt động</SelectItem>
                      <SelectItem value="pending">Đang chờ</SelectItem>
                      <SelectItem value="resolved">Đã giải quyết</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex-grow overflow-auto p-4 space-y-4">
                {selectedChat.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <div className="flex items-center mb-1">
                        <div className="flex items-center">
                          {msg.sender === "user" ? (
                            <User className="h-3 w-3 mr-1" />
                          ) : (
                            <Bot className="h-3 w-3 mr-1" />
                          )}
                          <span className="text-xs font-medium">
                            {msg.sender === "user"
                              ? selectedChat.customer.name
                              : "Chatbot"}
                          </span>
                        </div>
                        <span className="text-xs ml-2 opacity-70">
                          {msg.timestamp}
                        </span>
                      </div>
                      <p>{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Nhập tin nhắn..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-grow"
                  />
                  <Button
                    disabled={!message.trim()}
                    onClick={() => setMessage("")}
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
                <p className="text-muted-foreground">
                  Chọn một hội thoại từ danh sách bên trái để bắt đầu.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function mapPlatform(platform: string): string {
  const platforms: Record<string, string> = {
    web: "Website",
    facebook: "Facebook",
    whatsapp: "WhatsApp",
    telegram: "Telegram",
  };
  return platforms[platform] || platform;
}

export default Conversations;
