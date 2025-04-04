
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface PlatformData {
  name: string;
  value: number;
  color: string;
}

interface PlatformStatisticsProps {
  title: string;
  platforms: PlatformData[];
}

export function PlatformStatistics({ title, platforms }: PlatformStatisticsProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {platforms.map((platform, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <div 
                    className="h-3 w-3 rounded-full mr-2" 
                    style={{ backgroundColor: platform.color }}
                  ></div>
                  <span className="text-sm">{platform.name}</span>
                </div>
                <span className="text-sm font-medium">{platform.value}%</span>
              </div>
              <Progress 
                value={platform.value} 
                className={`h-2 bg-muted ${
                  index > 0 ? `[&>div]:bg-${platform.color}` : ""
                }`} 
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default PlatformStatistics;
