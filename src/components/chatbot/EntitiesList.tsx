
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Plus } from "lucide-react";

export function EntitiesList() {
  return (
    <div className="text-center">
      <p className="text-sm text-muted-foreground mb-4">
        Thiết lập các thực thể (entities) để trích xuất thông tin từ tin nhắn của người dùng
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm flex justify-between items-center">
              <span>Mã đơn hàng</span>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Edit className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground mb-2">Mẫu</p>
              <div className="text-xs p-1 bg-muted rounded-md">ORD-12345</div>
              <div className="text-xs p-1 bg-muted rounded-md">#12345</div>
              <p className="text-xs text-muted-foreground mt-2">Loại: Regex</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm flex justify-between items-center">
              <span>Tên sản phẩm</span>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Edit className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground mb-2">Mẫu</p>
              <div className="text-xs p-1 bg-muted rounded-md">iPhone 15</div>
              <div className="text-xs p-1 bg-muted rounded-md">Áo thun trắng</div>
              <p className="text-xs text-muted-foreground mt-2">Loại: Danh sách</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-dashed border-2 flex flex-col items-center justify-center p-6">
          <Plus className="h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-sm font-medium">Thêm thực thể mới</p>
          <p className="text-xs text-muted-foreground mt-1">Tạo thực thể mới cho chatbot</p>
        </Card>
      </div>
    </div>
  );
}
