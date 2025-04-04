
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ChatbotSettings() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="bot-name">Tên chatbot</Label>
          <Input id="bot-name" defaultValue="Chatbot Hỗ Trợ Khách Hàng" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="welcome-message">Tin nhắn chào mừng</Label>
          <Textarea
            id="welcome-message"
            defaultValue="Xin chào! Tôi là chatbot hỗ trợ khách hàng. Tôi có thể giúp gì cho bạn?"
            className="min-h-[100px]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fallback-message">Tin nhắn dự phòng</Label>
          <Textarea
            id="fallback-message"
            defaultValue="Xin lỗi, tôi không hiểu yêu cầu của bạn. Bạn có thể diễn đạt lại hoặc chọn một trong các tùy chọn bên dưới."
            className="min-h-[100px]"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="handoff-threshold">Ngưỡng chuyển giao cho nhân viên</Label>
          <div className="flex items-center">
            <Input id="handoff-threshold" type="number" defaultValue="3" className="w-16 mr-2" />
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
      
      <div className="md:col-span-2 mt-6 flex justify-end">
        <Button variant="outline" className="mr-2">Hủy</Button>
        <Button>Lưu cài đặt</Button>
      </div>
    </div>
  );
}
