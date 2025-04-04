
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface MetricData {
  name: string;
  value: number;
}

interface PerformanceMetricsProps {
  title: string;
  metrics: MetricData[];
}

export function PerformanceMetrics({ title, metrics }: PerformanceMetricsProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {metrics.map((metric, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <span className="text-sm">{metric.name}</span>
                </div>
                <span className="text-sm font-medium">{metric.value}%</span>
              </div>
              <Progress value={metric.value} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default PerformanceMetrics;
