
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bot, Check, Code, Eye, Globe, Lock, Save, Users } from "lucide-react";

export function Settings() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Cài đặt</h2>
          <p className="text-muted-foreground">
            Quản lý các cài đặt của nền tảng chatbot
          </p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">Chung</TabsTrigger>
          <TabsTrigger value="appearance">Giao diện</TabsTrigger>
          <TabsTrigger value="integrations">Tích hợp</TabsTrigger>
          <TabsTrigger value="security">Bảo mật</TabsTrigger>
          <TabsTrigger value="language">Ngôn ngữ</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin chung</CardTitle>
              <CardDescription>
                Cập nhật thông tin cơ bản về nền tảng chatbot của bạn
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Tên công ty</Label>
                  <Input id="company-name" value="Công ty ABC" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" value="https://congtyabc.com" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="company-description">Mô tả</Label>
                  <Textarea
                    id="company-description"
                    value="Công ty ABC là công ty hàng đầu trong lĩnh vực..."
                    className="min-h-[100px]"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Cấu hình thông báo</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Thông báo qua email</Label>
                      <p className="text-xs text-muted-foreground">
                        Gửi thông báo qua email khi có hội thoại mới
                      </p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="report-notifications">Báo cáo hàng tuần</Label>
                      <p className="text-xs text-muted-foreground">
                        Gửi báo cáo tổng hợp hàng tuần qua email
                      </p>
                    </div>
                    <Switch id="report-notifications" defaultChecked />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="w-24">
                  <Save className="mr-2 h-4 w-4" />
                  Lưu
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Cấu hình nâng cao</CardTitle>
              <CardDescription>
                Thiết lập các thông số nâng cao cho chatbot
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="max-tokens">Số lượng token tối đa</Label>
                  <Input id="max-tokens" type="number" value="1024" />
                  <p className="text-xs text-muted-foreground">
                    Giới hạn độ dài phản hồi của chatbot
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="temperature">Nhiệt độ (Temperature)</Label>
                  <Input id="temperature" type="number" value="0.7" step="0.1" min="0" max="1" />
                  <p className="text-xs text-muted-foreground">
                    Kiểm soát độ sáng tạo của câu trả lời (0-1)
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeout">Thời gian chờ (ms)</Label>
                  <Input id="timeout" type="number" value="15000" />
                  <p className="text-xs text-muted-foreground">
                    Thời gian tối đa cho mỗi phản hồi của chatbot
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model">Mô hình xử lý ngôn ngữ</Label>
                  <Select defaultValue="gpt-4">
                    <SelectTrigger id="model">
                      <SelectValue placeholder="Chọn mô hình" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                      <SelectItem value="claude-3">Claude 3</SelectItem>
                      <SelectItem value="custom">Mô hình tùy chỉnh</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Mô hình xử lý ngôn ngữ tự nhiên
                  </p>
                </div>
              </div>
              
              <div className="pt-4">
                <Button variant="outline" className="w-full">
                  <Code className="mr-2 h-4 w-4" />
                  Chế độ dành cho nhà phát triển
                </Button>
              </div>
              
              <div className="flex justify-end">
                <Button variant="outline" className="mr-2">
                  Khôi phục mặc định
                </Button>
                <Button className="w-24">
                  <Save className="mr-2 h-4 w-4" />
                  Lưu
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tùy chỉnh giao diện</CardTitle>
              <CardDescription>
                Điều chỉnh giao diện và thiết kế của chatbot
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Màu sắc chính</Label>
                    <div className="grid grid-cols-5 gap-2">
                      <div className="h-10 rounded-md bg-blue-500 cursor-pointer ring-2 ring-offset-2 ring-blue-500"></div>
                      <div className="h-10 rounded-md bg-teal-500 cursor-pointer"></div>
                      <div className="h-10 rounded-md bg-purple-500 cursor-pointer"></div>
                      <div className="h-10 rounded-md bg-red-500 cursor-pointer"></div>
                      <div className="h-10 rounded-md bg-gray-800 cursor-pointer"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="chat-position">Vị trí chatbot</Label>
                    <Select defaultValue="bottom-right">
                      <SelectTrigger id="chat-position">
                        <SelectValue placeholder="Chọn vị trí" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bottom-right">Góc phải dưới</SelectItem>
                        <SelectItem value="bottom-left">Góc trái dưới</SelectItem>
                        <SelectItem value="top-right">Góc phải trên</SelectItem>
                        <SelectItem value="top-left">Góc trái trên</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="chat-icon">Biểu tượng chatbot</Label>
                    <Select defaultValue="chat">
                      <SelectTrigger id="chat-icon">
                        <SelectValue placeholder="Chọn biểu tượng" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chat">
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            <span>Biểu tượng chat</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="bot">
                          <div className="flex items-center">
                            <Bot className="h-4 w-4 mr-2" />
                            <span>Robot</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="help">
                          <div className="flex items-center">
                            <HelpCircle className="h-4 w-4 mr-2" />
                            <span>Hỗ trợ</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="custom">Tùy chỉnh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Xem trước</Label>
                    <div className="border rounded-md h-[300px] relative bg-gray-50 flex items-center justify-center">
                      <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white cursor-pointer shadow-lg">
                        <MessageSquare className="h-6 w-6" />
                      </div>
                      <div className="w-64 h-80 border rounded-lg shadow-lg bg-white absolute bottom-20 right-4 p-3 text-left">
                        <div className="flex justify-between items-center mb-2">
                          <div className="font-medium">Chatbot hỗ trợ</div>
                          <X className="h-4 w-4 cursor-pointer" />
                        </div>
                        <div className="h-56 overflow-y-auto space-y-2 text-sm">
                          <div className="bg-blue-50 p-2 rounded-lg max-w-[80%]">
                            <p>Xin chào! Tôi có thể giúp gì cho bạn?</p>
                          </div>
                          <div className="bg-gray-100 p-2 rounded-lg max-w-[80%] ml-auto">
                            <p>Tôi cần thông tin về sản phẩm X.</p>
                          </div>
                          <div className="bg-blue-50 p-2 rounded-lg max-w-[80%]">
                            <p>Sản phẩm X là một trong những sản phẩm tốt nhất của chúng tôi...</p>
                          </div>
                        </div>
                        <div className="flex mt-2">
                          <Input placeholder="Nhập tin nhắn..." className="text-xs h-8" />
                          <Button size="sm" className="ml-1 h-8 w-8 p-0">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button variant="outline" className="mr-2">
                  <Eye className="mr-2 h-4 w-4" />
                  Xem trước
                </Button>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Lưu thay đổi
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tích hợp với bên thứ ba</CardTitle>
              <CardDescription>
                Kết nối chatbot với các dịch vụ và nền tảng khác
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-lg bg-white">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-blue-500 rounded-md flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="14" x="8" y="6" rx="4" /><path d="m19 7-3 2" /><path d="m5 7 3 2" /><path d="m19 19-3-2" /><path d="m5 19 3-2" /><path d="M20 13h-4" /><path d="M4 13h4" /><path d="m10 4 1 2" /><path d="m14 4-1 2" /></svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium">Facebook Messenger</h4>
                      <p className="text-sm text-muted-foreground">Kết nối với Facebook Messenger</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-green-600 font-medium flex items-center mr-4">
                      <Check className="h-4 w-4 mr-1" />
                      Đã kết nối
                    </span>
                    <Button variant="outline" size="sm">Cấu hình</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg bg-white">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-green-500 rounded-md flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C4.52 3 5.08 3 6.2 3h11.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C21 4.52 21 5.08 21 6.2v7.6c0 1.12 0 1.68-.218 2.108a2.001 2.001 0 0 1-.874.874C19.48 17 18.92 17 17.8 17H6.2c-1.12 0-1.68 0-2.108-.218a2.002 2.002 0 0 1-.874-.874C3 15.48 3 14.92 3 13.8V6.2Z" /><path d="M3 6.2v3.6c.58-.29 1.332-.29 1.912 0l6 3c.17.085.395.085.565 0l6-3c.58-.29 1.332-.29 1.912 0v3.6"/></svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium">WhatsApp</h4>
                      <p className="text-sm text-muted-foreground">Kết nối với WhatsApp Business API</p>
                    </div>
                  </div>
                  <div>
                    <Button>Kết nối</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg bg-white">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-blue-400 rounded-md flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h16a2 2 0 0 1 1.2.4" /><path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" /></svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium">Email</h4>
                      <p className="text-sm text-muted-foreground">Tích hợp với hệ thống email</p>
                    </div>
                  </div>
                  <div>
                    <Button>Kết nối</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg bg-white">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-purple-500 rounded-md flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5" /><path d="M21 11.5A8.5 8.5 0 0 0 3 5.5" /><path d="M12 20v2" /><path d="M20 11.5c0 4.14 0 6.21-1.405 7.605C17.21 20.5 15.14 20.5 11 20.5" /><path d="M4 11.5c0 4.14 0 6.21 1.405 7.605" /><path d="M11.5 4H11a7 7 0 0 0-7 7v0" /><path d="M8.5 3C10 5 8.5 7.5 7 8l-1.5.5" /><path d="M11.5 1C13 3 11.5 5.5 10 6L8.5 6.5" /></svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium">Telegram</h4>
                      <p className="text-sm text-muted-foreground">Kết nối với Telegram Bot API</p>
                    </div>
                  </div>
                  <div>
                    <Button>Kết nối</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg bg-white">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-blue-600 rounded-md flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10v4h10v-4" /><path d="M17 17.5c.33.14.64.32.95.54a8.02 8.02 0 0 1 3.01-5.5 8 8 0 0 0-16 0c.68.14 1.35.33 2 .56A7.99 7.99 0 0 1 17 17.5z" /></svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium">Slack</h4>
                      <p className="text-sm text-muted-foreground">Tích hợp với Slack</p>
                    </div>
                  </div>
                  <div>
                    <Button>Kết nối</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt bảo mật</CardTitle>
              <CardDescription>
                Quản lý các cài đặt bảo mật và quyền riêng tư
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Xác thực và quyền truy cập</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="2fa">Xác thực hai yếu tố (2FA)</Label>
                          <p className="text-xs text-muted-foreground">
                            Yêu cầu xác thực bổ sung khi đăng nhập
                          </p>
                        </div>
                        <Switch id="2fa" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="session-timeout">Thời gian hết phiên</Label>
                          <p className="text-xs text-muted-foreground">
                            Tự động đăng xuất sau thời gian không hoạt động
                          </p>
                        </div>
                        <Select defaultValue="30">
                          <SelectTrigger id="session-timeout" className="w-[120px]">
                            <SelectValue placeholder="Chọn thời gian" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 phút</SelectItem>
                            <SelectItem value="30">30 phút</SelectItem>
                            <SelectItem value="60">1 giờ</SelectItem>
                            <SelectItem value="120">2 giờ</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="ip-restriction">Giới hạn IP</Label>
                          <p className="text-xs text-muted-foreground">
                            Chỉ cho phép đăng nhập từ các địa chỉ IP được chỉ định
                          </p>
                        </div>
                        <Switch id="ip-restriction" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Mã hóa và dữ liệu</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="encrypt-data">Mã hóa dữ liệu</Label>
                          <p className="text-xs text-muted-foreground">
                            Mã hóa toàn bộ dữ liệu hội thoại và thông tin khách hàng
                          </p>
                        </div>
                        <Switch id="encrypt-data" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="data-retention">Lưu trữ dữ liệu</Label>
                          <p className="text-xs text-muted-foreground">
                            Thời gian lưu trữ dữ liệu hội thoại
                          </p>
                        </div>
                        <Select defaultValue="90">
                          <SelectTrigger id="data-retention" className="w-[120px]">
                            <SelectValue placeholder="Chọn thời gian" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30">30 ngày</SelectItem>
                            <SelectItem value="90">90 ngày</SelectItem>
                            <SelectItem value="180">180 ngày</SelectItem>
                            <SelectItem value="365">1 năm</SelectItem>
                            <SelectItem value="forever">Vĩnh viễn</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="pii-masking">Ẩn thông tin cá nhân</Label>
                          <p className="text-xs text-muted-foreground">
                            Tự động ẩn thông tin nhạy cảm trong hội thoại
                          </p>
                        </div>
                        <Switch id="pii-masking" defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-4">Tuân thủ quy định</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="gdpr" className="rounded border-gray-300" defaultChecked />
                      <Label htmlFor="gdpr">GDPR (Quy định bảo vệ dữ liệu châu Âu)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="ccpa" className="rounded border-gray-300" defaultChecked />
                      <Label htmlFor="ccpa">CCPA (Đạo luật bảo vệ quyền riêng tư California)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="hipaa" className="rounded border-gray-300" />
                      <Label htmlFor="hipaa">HIPAA (Đạo luật về y tế)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="pci-dss" className="rounded border-gray-300" />
                      <Label htmlFor="pci-dss">PCI DSS (Bảo mật dữ liệu thanh toán)</Label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>
                    <Lock className="mr-2 h-4 w-4" />
                    Cập nhật cài đặt bảo mật
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="language" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt ngôn ngữ</CardTitle>
              <CardDescription>
                Quản lý ngôn ngữ và các cài đặt đa ngôn ngữ
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="default-language">Ngôn ngữ mặc định</Label>
                    <Select defaultValue="vi">
                      <SelectTrigger id="default-language">
                        <SelectValue placeholder="Chọn ngôn ngữ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vi">Tiếng Việt</SelectItem>
                        <SelectItem value="en">Tiếng Anh</SelectItem>
                        <SelectItem value="fr">Tiếng Pháp</SelectItem>
                        <SelectItem value="de">Tiếng Đức</SelectItem>
                        <SelectItem value="ja">Tiếng Nhật</SelectItem>
                        <SelectItem value="zh">Tiếng Trung</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Ngôn ngữ được hỗ trợ</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="lang-vi" className="rounded border-gray-300" defaultChecked />
                        <Label htmlFor="lang-vi">Tiếng Việt</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="lang-en" className="rounded border-gray-300" defaultChecked />
                        <Label htmlFor="lang-en">Tiếng Anh</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="lang-fr" className="rounded border-gray-300" />
                        <Label htmlFor="lang-fr">Tiếng Pháp</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="lang-de" className="rounded border-gray-300" />
                        <Label htmlFor="lang-de">Tiếng Đức</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="lang-ja" className="rounded border-gray-300" />
                        <Label htmlFor="lang-ja">Tiếng Nhật</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="lang-zh" className="rounded border-gray-300" />
                        <Label htmlFor="lang-zh">Tiếng Trung</Label>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm ngôn ngữ
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="auto-translate">Tự động dịch</Label>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm">Tự động dịch tin nhắn</p>
                        <p className="text-xs text-muted-foreground">
                          Dịch tự động tin nhắn sang ngôn ngữ của người dùng
                        </p>
                      </div>
                      <Switch id="auto-translate" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="translation-model">Mô hình dịch</Label>
                    <Select defaultValue="neural">
                      <SelectTrigger id="translation-model">
                        <SelectValue placeholder="Chọn mô hình" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="neural">Neural Machine Translation</SelectItem>
                        <SelectItem value="statistical">Statistical Machine Translation</SelectItem>
                        <SelectItem value="hybrid">Hybrid Translation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fallback-language">Ngôn ngữ dự phòng</Label>
                    <Select defaultValue="en">
                      <SelectTrigger id="fallback-language">
                        <SelectValue placeholder="Chọn ngôn ngữ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vi">Tiếng Việt</SelectItem>
                        <SelectItem value="en">Tiếng Anh</SelectItem>
                        <SelectItem value="fr">Tiếng Pháp</SelectItem>
                        <SelectItem value="de">Tiếng Đức</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Ngôn ngữ sử dụng khi không thể xác định ngôn ngữ của người dùng
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button>
                  <Globe className="mr-2 h-4 w-4" />
                  Lưu cài đặt ngôn ngữ
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function HelpCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function MessageSquare(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function Plus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function Send(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function X(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default Settings;
