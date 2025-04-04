
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { 
  BarChart, 
  Users, 
  MessageSquare, 
  Info, 
  Settings, 
  Search,
  ChevronDown,
  Filter,
  ArrowRight
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface ChatStats {
  totalChats: number;
  activeChats: number;
  resolvedChats: number;
  averageResponseTime: string;
}

interface BusinessDashboardProps {}

export function BusinessDashboard({}: BusinessDashboardProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [recentChats, setRecentChats] = useState<any[]>([]);
  const [stats, setStats] = useState<ChatStats>({
    totalChats: 0,
    activeChats: 0,
    resolvedChats: 0,
    averageResponseTime: "0 phút"
  });
  const [timeRange, setTimeRange] = useState<string>("7days");

  const fetchDashboardData = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      // Lấy thống kê hội thoại
      const { data: conversationsData, error: conversationsError } = await supabase
        .from('conversations')
        .select('*', { count: 'exact' });

      if (conversationsError) throw conversationsError;

      // Lấy các hội thoại gần đây
      const { data: recentConversationsData, error: recentError } = await supabase
        .from('conversations')
        .select(`
          id,
          title,
          created_at,
          updated_at
        `)
        .order('updated_at', { ascending: false })
        .limit(5);

      if (recentError) throw recentError;

      setRecentChats(recentConversationsData || []);

      // Giả lập thống kê cho dashboard
      setStats({
        totalChats: conversationsData?.length || 0,
        activeChats: Math.floor((conversationsData?.length || 0) * 0.7),
        resolvedChats: Math.floor((conversationsData?.length || 0) * 0.3),
        averageResponseTime: "5 phút"
      });

    } catch (error) {
      console.error("Lỗi khi tải dữ liệu dashboard:", error);
      toast.error("Không thể tải dữ liệu dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const handleViewChat = (chatId: string) => {
    navigate(`/dashboard/chat/${chatId}`);
  };

  const changeTimeRange = (range: string) => {
    setTimeRange(range);
    toast.info(`Đã chuyển sang xem dữ liệu ${range === "7days" ? "7 ngày" : range === "30days" ? "30 ngày" : "90 ngày"}`);
    // Trong thực tế, bạn sẽ gọi API để lấy dữ liệu mới dựa trên range
  };

  return (
    <Layout title="Quản lý Doanh nghiệp">
      <div className="animate-fade-in">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Tổng quan Hoạt động</h1>
          <p className="text-gray-500">Xem tình hình hoạt động của doanh nghiệp</p>
        </div>

        {/* Bộ lọc thời gian */}
        <div className="mb-6 flex items-center justify-between">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm kiếm..."
              className="w-full pl-8 rounded-full"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => changeTimeRange("7days")} className={timeRange === "7days" ? "bg-primary text-white" : ""}>
              7 ngày
            </Button>
            <Button variant="outline" size="sm" onClick={() => changeTimeRange("30days")} className={timeRange === "30days" ? "bg-primary text-white" : ""}>
              30 ngày
            </Button>
            <Button variant="outline" size="sm" onClick={() => changeTimeRange("90days")} className={timeRange === "90days" ? "bg-primary text-white" : ""}>
              90 ngày
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-1" />
              Lọc
            </Button>
          </div>
        </div>

        {/* Thống kê chính */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-4 mb-6">
          <Card className="p-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 p-3 mr-3">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Tổng số hội thoại</div>
                <div className="text-2xl font-bold">{stats.totalChats}</div>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center">
              <div className="rounded-full bg-green-100 p-3 mr-3">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Hội thoại đang hoạt động</div>
                <div className="text-2xl font-bold">{stats.activeChats}</div>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center">
              <div className="rounded-full bg-purple-100 p-3 mr-3">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Hội thoại đã giải quyết</div>
                <div className="text-2xl font-bold">{stats.resolvedChats}</div>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center">
              <div className="rounded-full bg-amber-100 p-3 mr-3">
                <Info className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Thời gian phản hồi TB</div>
                <div className="text-2xl font-bold">{stats.averageResponseTime}</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Nội dung chính */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          {/* Cột trái - Hội thoại gần đây */}
          <div className="col-span-2">
            <Card>
              <div className="p-4 border-b flex items-center justify-between">
                <h2 className="text-lg font-semibold">Hội thoại gần đây</h2>
                <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/chats')}>
                  Xem tất cả
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              <div className="divide-y">
                {isLoading ? (
                  <div className="p-6 text-center">Đang tải...</div>
                ) : recentChats.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>Chưa có hội thoại nào</p>
                  </div>
                ) : (
                  recentChats.map((chat) => (
                    <div key={chat.id} className="p-4 hover:bg-gray-50 cursor-pointer" onClick={() => handleViewChat(chat.id)}>
                      <div className="flex justify-between mb-1">
                        <h3 className="font-medium">{chat.title || "Hội thoại không có tiêu đề"}</h3>
                        <span className="text-xs text-gray-500">
                          {new Date(chat.updated_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {chat.id.substring(0, 8)}...
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>

          {/* Cột phải - Cài đặt nhanh */}
          <div>
            <Card>
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Công cụ nhanh</h2>
              </div>
              <div className="p-4 space-y-3">
                <Button className="w-full justify-start" onClick={() => navigate("/dashboard/chats")}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Quản lý hội thoại
                </Button>
                <Button className="w-full justify-start" onClick={() => navigate("/dashboard/analytics")}>
                  <BarChart className="mr-2 h-4 w-4" />
                  Thống kê & báo cáo
                </Button>
                <Button className="w-full justify-start" onClick={() => navigate("/dashboard/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Cài đặt doanh nghiệp
                </Button>
              </div>
            </Card>

            <Card className="mt-4">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Trợ giúp nhanh</h2>
              </div>
              <div className="p-4">
                <ul className="space-y-2 text-sm">
                  <li className="hover:text-blue-600 cursor-pointer">Làm thế nào để tùy chỉnh chatbot?</li>
                  <li className="hover:text-blue-600 cursor-pointer">Cách xem báo cáo phân tích?</li>
                  <li className="hover:text-blue-600 cursor-pointer">Tích hợp chatbot với website</li>
                  <li className="hover:text-blue-600 cursor-pointer">Cài đặt thông báo email</li>
                  <li className="hover:text-blue-600 cursor-pointer">Xem tất cả hướng dẫn</li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default BusinessDashboard;
