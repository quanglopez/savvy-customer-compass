
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AreaChart, BarChart, PieChart } from "@/components/ui/chart";
import {
  Activity,
  BarChart3,
  MessagesSquare,
  MessageSquare,
  UserCheck,
  Users,
  Bot,
  Zap,
  Clock,
  Award,
  ArrowUpRight,
  ExternalLink,
  BarChart2,
  PieChart as PieChartIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import StatCard from "./StatCard";
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
];

export function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Tổng số hội thoại"
          value="1,234"
          icon={<MessageSquare className="h-4 w-4" />}
          trend={{ value: 12, direction: "up" }}
        />
        <StatCard
          title="Tỷ lệ giải quyết"
          value="89%"
          icon={<UserCheck className="h-4 w-4" />}
          trend={{ value: 3, direction: "up" }}
        />
        <StatCard
          title="Thời gian phản hồi TB"
          value="45s"
          icon={<Clock className="h-4 w-4" />}
          trend={{ value: 8, direction: "down" }}
        />
        <StatCard
          title="Đánh giá chatbot"
          value="4.7/5"
          icon={<Award className="h-4 w-4" />}
          trend={{ value: 2, direction: "up" }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Tabs defaultValue="conversations" className="col-span-7 md:col-span-4">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="conversations">Hội thoại gần đây</TabsTrigger>
              <TabsTrigger value="analytics">Số liệu thống kê</TabsTrigger>
            </TabsList>
            <Button size="sm" variant="outline" className="h-8">
              Xem tất cả <ExternalLink className="ml-2 h-3 w-3" />
            </Button>
          </div>
          <TabsContent value="conversations" className="space-y-4">
            {dummyChats.map((chat) => (
              <ChatPreview key={chat.id} chat={chat} />
            ))}
          </TabsContent>
          <TabsContent value="analytics">
            <Card>
              <CardHeader className="flex flex-row items-center pb-2">
                <div className="grid gap-2">
                  <CardTitle>Hiệu suất chatbot</CardTitle>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="week">Tuần</TabsTrigger>
                    <TabsTrigger value="month" defaultChecked>
                      Tháng
                    </TabsTrigger>
                    <TabsTrigger value="year">Năm</TabsTrigger>
                  </TabsList>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="h-[200px]">
                  <AreaChart
                    data={[
                      { name: "T2", resolved: 120, handoff: 20 },
                      { name: "T3", resolved: 150, handoff: 25 },
                      { name: "T4", resolved: 180, handoff: 30 },
                      { name: "T5", resolved: 220, handoff: 35 },
                      { name: "T6", resolved: 280, handoff: 40 },
                      { name: "T7", resolved: 250, handoff: 35 },
                      { name: "CN", resolved: 200, handoff: 30 },
                    ]}
                    categories={["resolved", "handoff"]}
                    index="name"
                    colors={["#0066CC", "#00A3B4"]}
                    valueFormatter={(value: number) => `${value} cuộc hội thoại`}
                    className="h-[200px]"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="col-span-7 md:col-span-3 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Kết nối đa kênh</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Globe className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">Website</span>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    Đã kết nối
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <Facebook className="h-4 w-4 text-blue-500" />
                    </div>
                    <span className="font-medium">Facebook</span>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    Đã kết nối
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
                      <MessageSquare className="h-4 w-4 text-green-500" />
                    </div>
                    <span className="font-medium">WhatsApp</span>
                  </div>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                    Đang thiết lập
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-blue-400/10 flex items-center justify-center">
                      <Send className="h-4 w-4 text-blue-400" />
                    </div>
                    <span className="font-medium">Telegram</span>
                  </div>
                  <Button size="sm" variant="outline" className="h-7 text-xs">
                    Kết nối
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Phân loại hội thoại</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[160px]">
                <PieChart
                  data={[
                    { name: "Hỏi đáp", value: 60 },
                    { name: "Đặt hàng", value: 20 },
                    { name: "Khiếu nại", value: 10 },
                    { name: "Khác", value: 10 },
                  ]}
                  index="name"
                  categories={["value"]}
                  colors={["#0066CC", "#00A3B4", "#FFC107", "#FF5722"]}
                  valueFormatter={(value: number) => `${value}%`}
                  className="h-[160px]"
                />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-[#0066CC] mr-2"></div>
                  <span className="text-xs">Hỏi đáp</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-[#00A3B4] mr-2"></div>
                  <span className="text-xs">Đặt hàng</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-[#FFC107] mr-2"></div>
                  <span className="text-xs">Khiếu nại</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-[#FF5722] mr-2"></div>
                  <span className="text-xs">Khác</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Facebook(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function Globe(props: React.SVGProps<SVGSVGElement>) {
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
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
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

export default Dashboard;
