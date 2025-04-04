
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Plus } from "lucide-react";

export function IntentsList() {
  return (
    <div className="text-center">
      <p className="text-sm text-muted-foreground mb-4">
        Thiết lập các ý định (intents) để chatbot có thể hiểu ý định của khách hàng
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm flex justify-between items-center">
              <span>Thông tin sản phẩm</span>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Edit className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground mb-2">Câu mẫu</p>
              <div className="text-xs p-1 bg-muted rounded-md">Sản phẩm này có tính năng gì?</div>
              <div className="text-xs p-1 bg-muted rounded-md">Cho tôi biết về sản phẩm X</div>
              <div className="text-xs p-1 bg-muted rounded-md">Đặc điểm của sản phẩm này là gì?</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm flex justify-between items-center">
              <span>Trạng thái đơn hàng</span>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Edit className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground mb-2">Câu mẫu</p>
              <div className="text-xs p-1 bg-muted rounded-md">Đơn hàng của tôi ở đâu?</div>
              <div className="text-xs p-1 bg-muted rounded-md">Kiểm tra trạng thái đơn hàng</div>
              <div className="text-xs p-1 bg-muted rounded-md">Khi nào đơn hàng được giao?</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-dashed border-2 flex flex-col items-center justify-center p-6">
          <Plus className="h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-sm font-medium">Thêm ý định mới</p>
          <p className="text-xs text-muted-foreground mt-1">Tạo ý định mới cho chatbot</p>
        </Card>
      </div>
    </div>
  );
}
