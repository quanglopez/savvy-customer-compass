
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { AreaChart } from "@/components/ui/chart";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  data: any[];
  categories: string[];
  index: string;
  colors: string[];
  valueFormatter: (value: number) => string;
}

export function MetricCard({
  title,
  value,
  change,
  data,
  categories,
  index,
  colors,
  valueFormatter,
}: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{change}</p>
        <div className="mt-4 h-[80px]">
          <AreaChart
            data={data}
            categories={categories}
            index={index}
            colors={colors}
            valueFormatter={valueFormatter}
            className="h-[80px]"
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default MetricCard;
