
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { PieChart } from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoryChartProps {
  title: string;
  data: any[];
  categories: string[];
  index: string;
  colors: string[];
  valueFormatter: (value: number) => string;
}

export function CategoryChart({
  title,
  data,
  categories,
  index,
  colors,
  valueFormatter,
}: CategoryChartProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>{title}</CardTitle>
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
            data={data}
            index={index}
            categories={categories}
            valueFormatter={valueFormatter}
            colors={colors}
            className="h-[300px]"
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default CategoryChart;
