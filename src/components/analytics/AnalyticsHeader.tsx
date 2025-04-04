
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Download } from "lucide-react";

export function AnalyticsHeader() {
  return (
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
  );
}

export default AnalyticsHeader;
