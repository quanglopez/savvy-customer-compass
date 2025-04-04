
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AreaChart, BarChart, PieChart } from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import {
  Calendar,
  Download,
  BarChart3,
  MessageSquare,
  ArrowRight,
  Users,
  Clock,
  Activity,
  BarChart2,
  PieChart as PieChartIcon
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Analytics() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Phân tích dữ liệu</h2>
          <p className="text-muted-foreground">
            Thống kê chi tiết về hiệu suất chatbot và tương tác với người dùng
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            <span>Tháng 4, 2025</span>
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Tổng số hội thoại
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,289</div>
            <p className="text-xs text-muted-foreground mt-1">
              Tăng 12% so với tháng trước
            </p>
            <div className="mt-4 h-[80px]">
              <AreaChart
                data={[
                  { date: "01/04", count: 300 },
                  { date: "08/04", count: 450 },
                  { date: "15/04", count: 420 },
                  { date: "22/04", count: 570 },
                  { date: "29/04", count: 600 },
                ]}
                categories={["count"]}
                index="date"
                colors={["#0066CC"]}
                valueFormatter={(value: number) => `${value} hội thoại`}
                className="h-[80px]"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Tỷ lệ giải quyết
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Tăng 3% so với tháng trước
            </p>
            <div className="mt-4 h-[80px]">
              <AreaChart
                data={[
                  { date: "01/04", rate: 85 },
                  { date: "08/04", rate: 87 },
                  { date: "15/04", rate: 86 },
                  { date: "22/04", rate: 88 },
                  { date: "29/04", rate: 89 },
                ]}
                categories={["rate"]}
                index="date"
                colors={["#00A3B4"]}
                valueFormatter={(value: number) => `${value}%`}
                className="h-[80px]"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Thời gian phản hồi TB
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45s</div>
            <p className="text-xs text-muted-foreground mt-1">
              Giảm 8% so với tháng trước
            </p>
            <div className="mt-4 h-[80px]">
              <AreaChart
                data={[
                  { date: "01/04", time: 52 },
                  { date: "08/04", time: 49 },
                  { date: "15/04", time: 48 },
                  { date: "22/04", time: 47 },
                  { date: "29/04", time: 45 },
                ]}
                categories={["time"]}
                index="date"
                colors={["#FFC107"]}
                valueFormatter={(value: number) => `${value}s`}
                className="h-[80px]"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>Phân tích hội thoại theo thời gian</CardTitle>
              <Select defaultValue="week">
                <SelectTrigger className="w-[120px] h-8">
                  <SelectValue placeholder="Khoảng thời gian" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Ngày</SelectItem>
                  <SelectItem value="week">Tuần</SelectItem>
                  <SelectItem value="month">Tháng</SelectItem>
                  <SelectItem value="year">Năm</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <BarChart
                data={[
                  { date: "T2", total: 350, automated: 290, handoff: 60 },
                  { date: "T3", total: 400, automated: 320, handoff: 80 },
                  { date: "T4", total: 500, automated: 410, handoff: 90 },
                  { date: "T5", total: 470, automated: 380, handoff: 90 },
                  { date: "T6", total: 420, automated: 350, handoff: 70 },
                  { date: "T7", total: 380, automated: 320, handoff: 60 },
                  { date: "CN", total: 320, automated: 270, handoff: 50 },
                ]}
                categories={["automated", "handoff"]}
                index="date"
                colors={["#0066CC", "#00A3B4"]}
                stack
                valueFormatter={(value: number) => `${value} hội thoại`}
                className="h-[300px]"
              />
            </div>
            <div className="mt-3 flex justify-center">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-[#0066CC] mr-1"></div>
                  <span className="text-xs">Tự động</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-[#00A3B4] mr-1"></div>
                  <span className="text-xs">Chuyển tiếp</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>Phân loại hội thoại</CardTitle>
              <Select defaultValue="month">
                <SelectTrigger className="w-[120px] h-8">
                  <SelectValue placeholder="Khoảng thời gian" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Tuần này</SelectItem>
                  <SelectItem value="month">Tháng này</SelectItem>
                  <SelectItem value="quarter">Quý này</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <PieChart
                data={[
                  { category: "Hỏi đáp sản phẩm", value: 45 },
                  { category: "Đặt hàng & thanh toán", value: 25 },
                  { category: "Vận chuyển & giao hàng", value: 15 },
                  { category: "Khiếu nại & đổi trả", value: 10 },
                  { category: "Khác", value: 5 },
                ]}
                index="category"
                categories={["value"]}
                valueFormatter={(value: number) => `${value}%`}
                colors={["#0066CC", "#00A3B4", "#FFC107", "#FF5722", "#9C27B0"]}
                className="h-[300px]"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Thống kê theo nền tảng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-primary mr-2"></div>
                    <span className="text-sm">Website</span>
                  </div>
                  <span className="text-sm font-medium">65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm">Facebook</span>
                  </div>
                  <span className="text-sm font-medium">20%</span>
                </div>
                <Progress value={20} className="h-2 bg-muted [&>div]:bg-blue-500" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm">WhatsApp</span>
                  </div>
                  <span className="text-sm font-medium">10%</span>
                </div>
                <Progress value={10} className="h-2 bg-muted [&>div]:bg-green-500" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-blue-400 mr-2"></div>
                    <span className="text-sm">Telegram</span>
                  </div>
                  <span className="text-sm font-medium">5%</span>
                </div>
                <Progress value={5} className="h-2 bg-muted [&>div]:bg-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Hiệu suất xử lý ngôn ngữ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <span className="text-sm">Nhận diện ý định</span>
                  </div>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <span className="text-sm">Trích xuất thông tin</span>
                  </div>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <span className="text-sm">Phân tích cảm xúc</span>
                  </div>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <span className="text-sm">Đa ngôn ngữ</span>
                  </div>
                  <span className="text-sm font-medium">80%</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Đánh giá từ khách hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">4.7</div>
              <div className="text-sm text-muted-foreground mb-4">trên thang điểm 5.0</div>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-sm w-12">5 sao</span>
                  <div className="flex-1 mx-2">
                    <Progress value={80} className="h-2" />
                  </div>
                  <span className="text-sm w-8">80%</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm w-12">4 sao</span>
                  <div className="flex-1 mx-2">
                    <Progress value={15} className="h-2" />
                  </div>
                  <span className="text-sm w-8">15%</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm w-12">3 sao</span>
                  <div className="flex-1 mx-2">
                    <Progress value={3} className="h-2" />
                  </div>
                  <span className="text-sm w-8">3%</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm w-12">2 sao</span>
                  <div className="flex-1 mx-2">
                    <Progress value={1} className="h-2" />
                  </div>
                  <span className="text-sm w-8">1%</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm w-12">1 sao</span>
                  <div className="flex-1 mx-2">
                    <Progress value={1} className="h-2" />
                  </div>
                  <span className="text-sm w-8">1%</span>
                </div>
              </div>
              
              <div className="mt-4 text-sm">
                Dựa trên <span className="font-medium">2,145</span> đánh giá từ khách hàng
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Analytics;
