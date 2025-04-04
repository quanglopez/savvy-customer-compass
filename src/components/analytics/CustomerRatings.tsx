
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface RatingData {
  stars: number;
  percentage: number;
}

interface CustomerRatingsProps {
  title: string;
  averageRating: number;
  ratings: RatingData[];
  totalReviews: number;
}

export function CustomerRatings({ 
  title, 
  averageRating, 
  ratings,
  totalReviews
}: CustomerRatingsProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <div className="text-4xl font-bold text-primary">{averageRating}</div>
          <div className="text-sm text-muted-foreground mb-4">trên thang điểm 5.0</div>
          
          <div className="space-y-2">
            {ratings.map((rating, index) => (
              <div key={index} className="flex items-center">
                <span className="text-sm w-12">{rating.stars} sao</span>
                <div className="flex-1 mx-2">
                  <Progress value={rating.percentage} className="h-2" />
                </div>
                <span className="text-sm w-8">{rating.percentage}%</span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-sm">
            Dựa trên <span className="font-medium">{totalReviews.toLocaleString()}</span> đánh giá từ khách hàng
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CustomerRatings;
