
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { BarChart } from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ConversationChartProps {
  title: string;
  data: any[];
  categories: string[];
  index: string;
  colors: string[];
  valueFormatter: (value: number) => string;
}

export function ConversationChart({
  title,
  data,
  categories,
  index,
  colors,
  valueFormatter,
}: ConversationChartProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>{title}</CardTitle>
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
            data={data}
            categories={categories}
            index={index}
            colors={colors}
            stack={true}
            valueFormatter={valueFormatter}
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
  );
}

export default ConversationChart;
