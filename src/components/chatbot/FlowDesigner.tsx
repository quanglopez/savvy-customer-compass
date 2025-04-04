
import React from "react";
import { MessageSquare } from "lucide-react";

export function FlowDesigner() {
  return (
    <div className="border rounded-lg bg-slate-50 p-4 flex items-center justify-center relative min-h-[600px]">
      <div className="text-center">
        <div className="p-6 inline-block rounded-lg bg-white border shadow-sm mb-3">
          <MessageSquare className="h-8 w-8 text-primary mx-auto mb-2" />
          <p className="font-medium">Biểu đồ luồng hội thoại</p>
        </div>
        <p className="text-sm text-muted-foreground">
          Khu vực này sẽ hiển thị biểu đồ luồng hội thoại trực quan.
          <br />
          Kéo thả các nút để tạo luồng hội thoại.
        </p>
      </div>
    </div>
  );
}
