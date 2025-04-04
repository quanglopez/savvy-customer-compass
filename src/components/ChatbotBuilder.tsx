
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bot,
  Code,
  Edit,
  MessageSquare,
  Plus,
  Settings,
  Sliders,
  Sparkles,
  Zap,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export function ChatbotBuilder() {
  const [flowNodes, setFlowNodes] = useState([
    { id: "welcome", name: "Chào mừng", type: "message" },
    { id: "ask_question", name: "Hỏi vấn đề", type: "question" },
    { id: "product_info", name: "Thông tin sản phẩm", type: "intent" },
    { id: "order_status", name: "Trạng thái đơn hàng", type: "intent" },
    { id: "human_handoff", name: "Chuyển nhân viên", type: "handoff" },
  ]);

  const [selectedNode, setSelectedNode] = useState(flowNodes[0]);

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Xây dựng chatbot</h2>
          <p className="text-muted-foreground">
            Thiết kế luồng hội thoại và cấu hình chatbot của bạn
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Bot className="mr-2 h-4 w-4" />
            Kiểm thử
          </Button>
          <Button>
            <Zap className="mr-2 h-4 w-4" />
            Xuất bản
          </Button>
        </div>
      </div>

      <Tabs defaultValue="flow" className="space-y-4">
        <TabsList>
          <TabsTrigger value="flow">Luồng hội thoại</TabsTrigger>
          <TabsTrigger value="intents">Ý định</TabsTrigger>
          <TabsTrigger value="entities">Thực thể</TabsTrigger>
          <TabsTrigger value="settings">Cài đặt</TabsTrigger>
        </TabsList>

        <TabsContent value="flow" className="space-y-4">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-3 border rounded-lg p-4 bg-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Các nút</h3>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {flowNodes.map((node) => (
                  <div
                    key={node.id}
                    className={`p-3 border rounded-md cursor-pointer hover:bg-accent transition-colors ${
                      selectedNode.id === node.id
                        ? "border-primary bg-accent"
                        : ""
                    }`}
                    onClick={() => setSelectedNode(node)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {node.type === "message" && (
                          <MessageSquare className="h-4 w-4 mr-2 text-blue-500" />
                        )}
                        {node.type === "question" && (
                          <MessageSquare className="h-4 w-4 mr-2 text-purple-500" />
                        )}
                        {node.type === "intent" && (
                          <Sparkles className="h-4 w-4 mr-2 text-amber-500" />
                        )}
                        {node.type === "handoff" && (
                          <Zap className="h-4 w-4 mr-2 text-green-500" />
                        )}
                        <span className="text-sm font-medium">
                          {node.name}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground capitalize">
                        {node.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-4"
                size="sm"
              >
                <Plus className="mr-2 h-4 w-4" />
                Thêm nút mới
              </Button>
            </div>

            <div className="col-span-6 border rounded-lg bg-slate-50 p-4 flex items-center justify-center relative min-h-[600px]">
              <div className="text-center">
                <div className="p-6 inline-block rounded-lg bg-white border shadow-sm mb-3">
                  <MessageSquare className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="font-medium">Biểu đồ luồng hội thoại</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Khu vực này sẽ hiển thị biểu đồ luồng hội thoại trực quan.
                  <br />
                  Kéo thả các nút để tạo luồng hội thoại.
                </p>
              </div>
            </div>

            <div className="col-span-3 border rounded-lg p-4 bg-white">
              <h3 className="font-medium mb-4">Thuộc tính</h3>
              {selectedNode && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="node-name">Tên nút</Label>
                    <Input
                      id="node-name"
                      value={selectedNode.name}
                      onChange={() => {}}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="node-type">Loại nút</Label>
                    <Select defaultValue={selectedNode.type}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại nút" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="message">Tin nhắn</SelectItem>
                        <SelectItem value="question">Câu hỏi</SelectItem>
                        <SelectItem value="intent">Ý định</SelectItem>
                        <SelectItem value="handoff">Chuyển tiếp</SelectItem>
                        <SelectItem value="condition">Điều kiện</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="node-content">Nội dung</Label>
                    <Textarea
                      id="node-content"
                      placeholder="Nhập nội dung tin nhắn hoặc câu hỏi..."
                      className="min-h-[100px]"
                    />
                  </div>
                  {selectedNode.type === "intent" && (
                    <div className="space-y-2">
                      <Label htmlFor="intent-select">Ý định</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn ý định" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="product_info">
                            Thông tin sản phẩm
                          </SelectItem>
                          <SelectItem value="order_status">
                            Trạng thái đơn hàng
                          </SelectItem>
                          <SelectItem value="return_policy">
                            Chính sách đổi trả
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch id="required" />
                    <Label htmlFor="required">Bắt buộc</Label>
                  </div>
                  <div className="pt-4">
                    <Button className="w-full" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Cập nhật nút
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="intents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ý định</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Thiết lập các ý định (intents) để chatbot có thể hiểu ý định của khách hàng
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-white">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-sm flex justify-between items-center">
                        <span>Thông tin sản phẩm</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground mb-2">Câu mẫu</p>
                        <div className="text-xs p-1 bg-muted rounded-md">Sản phẩm này có tính năng gì?</div>
                        <div className="text-xs p-1 bg-muted rounded-md">Cho tôi biết về sản phẩm X</div>
                        <div className="text-xs p-1 bg-muted rounded-md">Đặc điểm của sản phẩm này là gì?</div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-sm flex justify-between items-center">
                        <span>Trạng thái đơn hàng</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground mb-2">Câu mẫu</p>
                        <div className="text-xs p-1 bg-muted rounded-md">Đơn hàng của tôi ở đâu?</div>
                        <div className="text-xs p-1 bg-muted rounded-md">Kiểm tra trạng thái đơn hàng</div>
                        <div className="text-xs p-1 bg-muted rounded-md">Khi nào đơn hàng được giao?</div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-dashed border-2 flex flex-col items-center justify-center p-6">
                    <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">Thêm ý định mới</p>
                    <p className="text-xs text-muted-foreground mt-1">Tạo ý định mới cho chatbot</p>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="entities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thực thể</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Thiết lập các thực thể (entities) để trích xuất thông tin từ tin nhắn của người dùng
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-white">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-sm flex justify-between items-center">
                        <span>Mã đơn hàng</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground mb-2">Mẫu</p>
                        <div className="text-xs p-1 bg-muted rounded-md">ORD-12345</div>
                        <div className="text-xs p-1 bg-muted rounded-md">#12345</div>
                        <p className="text-xs text-muted-foreground mt-2">Loại: Regex</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-sm flex justify-between items-center">
                        <span>Tên sản phẩm</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground mb-2">Mẫu</p>
                        <div className="text-xs p-1 bg-muted rounded-md">iPhone 15</div>
                        <div className="text-xs p-1 bg-muted rounded-md">Áo thun trắng</div>
                        <p className="text-xs text-muted-foreground mt-2">Loại: Danh sách</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-dashed border-2 flex flex-col items-center justify-center p-6">
                    <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">Thêm thực thể mới</p>
                    <p className="text-xs text-muted-foreground mt-1">Tạo thực thể mới cho chatbot</p>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt chatbot</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bot-name">Tên chatbot</Label>
                    <Input id="bot-name" value="Chatbot Hỗ Trợ Khách Hàng" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="welcome-message">Tin nhắn chào mừng</Label>
                    <Textarea
                      id="welcome-message"
                      value="Xin chào! Tôi là chatbot hỗ trợ khách hàng. Tôi có thể giúp gì cho bạn?"
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fallback-message">Tin nhắn dự phòng</Label>
                    <Textarea
                      id="fallback-message"
                      value="Xin lỗi, tôi không hiểu yêu cầu của bạn. Bạn có thể diễn đạt lại hoặc chọn một trong các tùy chọn bên dưới."
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="handoff-threshold">Ngưỡng chuyển giao cho nhân viên</Label>
                    <div className="flex items-center">
                      <Input id="handoff-threshold" type="number" value="3" className="w-16 mr-2" />
                      <span className="text-sm text-muted-foreground">lần không hiểu yêu cầu</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="enable-nlp">Kích hoạt xử lý ngôn ngữ tự nhiên (NLP)</Label>
                      <Switch id="enable-nlp" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="enable-human-handoff">Kích hoạt chuyển giao cho nhân viên</Label>
                      <Switch id="enable-human-handoff" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="enable-typing-indicator">Hiển thị trạng thái đang nhập</Label>
                      <Switch id="enable-typing-indicator" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="enable-feedback">Kích hoạt đánh giá hội thoại</Label>
                      <Switch id="enable-feedback" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="space-y-2 pt-2">
                    <Label htmlFor="languages">Ngôn ngữ hỗ trợ</Label>
                    <Select defaultValue="vi">
                      <SelectTrigger id="languages">
                        <SelectValue placeholder="Chọn ngôn ngữ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vi">Tiếng Việt</SelectItem>
                        <SelectItem value="en">Tiếng Anh</SelectItem>
                        <SelectItem value="multi">Đa ngôn ngữ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button variant="outline" className="mr-2">Hủy</Button>
                <Button>Lưu cài đặt</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ChatbotBuilder;
