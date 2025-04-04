
import React from "react";
import AnalyticsHeader from "./analytics/AnalyticsHeader";
import MetricCard from "./analytics/MetricCard";
import ConversationChart from "./analytics/ConversationChart";
import CategoryChart from "./analytics/CategoryChart";
import PlatformStatistics from "./analytics/PlatformStatistics";
import PerformanceMetrics from "./analytics/PerformanceMetrics";
import CustomerRatings from "./analytics/CustomerRatings";

export function Analytics() {
  // Metric Cards Data
  const conversationsData = [
    { date: "01/04", count: 300 },
    { date: "08/04", count: 450 },
    { date: "15/04", count: 420 },
    { date: "22/04", count: 570 },
    { date: "29/04", count: 600 },
  ];

  const resolutionRateData = [
    { date: "01/04", rate: 85 },
    { date: "08/04", rate: 87 },
    { date: "15/04", rate: 86 },
    { date: "22/04", rate: 88 },
    { date: "29/04", rate: 89 },
  ];

  const responseTimeData = [
    { date: "01/04", time: 52 },
    { date: "08/04", time: 49 },
    { date: "15/04", time: 48 },
    { date: "22/04", time: 47 },
    { date: "29/04", time: 45 },
  ];

  // Conversation Chart Data
  const conversationByTimeData = [
    { date: "T2", total: 350, automated: 290, handoff: 60 },
    { date: "T3", total: 400, automated: 320, handoff: 80 },
    { date: "T4", total: 500, automated: 410, handoff: 90 },
    { date: "T5", total: 470, automated: 380, handoff: 90 },
    { date: "T6", total: 420, automated: 350, handoff: 70 },
    { date: "T7", total: 380, automated: 320, handoff: 60 },
    { date: "CN", total: 320, automated: 270, handoff: 50 },
  ];

  // Category Chart Data
  const categoryData = [
    { category: "Hỏi đáp sản phẩm", value: 45 },
    { category: "Đặt hàng & thanh toán", value: 25 },
    { category: "Vận chuyển & giao hàng", value: 15 },
    { category: "Khiếu nại & đổi trả", value: 10 },
    { category: "Khác", value: 5 },
  ];

  // Platform Statistics Data
  const platformData = [
    { name: "Website", value: 65, color: "primary" },
    { name: "Facebook", value: 20, color: "blue-500" },
    { name: "WhatsApp", value: 10, color: "green-500" },
    { name: "Telegram", value: 5, color: "blue-400" },
  ];

  // Performance Metrics Data
  const performanceData = [
    { name: "Nhận diện ý định", value: 92 },
    { name: "Trích xuất thông tin", value: 85 },
    { name: "Phân tích cảm xúc", value: 78 },
    { name: "Đa ngôn ngữ", value: 80 },
  ];

  // Customer Ratings Data
  const ratingsData = [
    { stars: 5, percentage: 80 },
    { stars: 4, percentage: 15 },
    { stars: 3, percentage: 3 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 1 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <AnalyticsHeader />

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <MetricCard
          title="Tổng số hội thoại"
          value="5,289"
          change="Tăng 12% so với tháng trước"
          data={conversationsData}
          categories={["count"]}
          index="date"
          colors={["#0066CC"]}
          valueFormatter={(value: number) => `${value} hội thoại`}
        />

        <MetricCard
          title="Tỷ lệ giải quyết"
          value="89%"
          change="Tăng 3% so với tháng trước"
          data={resolutionRateData}
          categories={["rate"]}
          index="date"
          colors={["#00A3B4"]}
          valueFormatter={(value: number) => `${value}%`}
        />

        <MetricCard
          title="Thời gian phản hồi TB"
          value="45s"
          change="Giảm 8% so với tháng trước"
          data={responseTimeData}
          categories={["time"]}
          index="date"
          colors={["#FFC107"]}
          valueFormatter={(value: number) => `${value}s`}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <ConversationChart
          title="Phân tích hội thoại theo thời gian"
          data={conversationByTimeData}
          categories={["automated", "handoff"]}
          index="date"
          colors={["#0066CC", "#00A3B4"]}
          valueFormatter={(value: number) => `${value} hội thoại`}
        />

        <CategoryChart
          title="Phân loại hội thoại"
          data={categoryData}
          categories={["value"]}
          index="category"
          colors={["#0066CC", "#00A3B4", "#FFC107", "#FF5722", "#9C27B0"]}
          valueFormatter={(value: number) => `${value}%`}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <PlatformStatistics
          title="Thống kê theo nền tảng"
          platforms={platformData}
        />

        <PerformanceMetrics
          title="Hiệu suất xử lý ngôn ngữ"
          metrics={performanceData}
        />

        <CustomerRatings
          title="Đánh giá từ khách hàng"
          averageRating={4.7}
          ratings={ratingsData}
          totalReviews={2145}
        />
      </div>
    </div>
  );
}

export default Analytics;
