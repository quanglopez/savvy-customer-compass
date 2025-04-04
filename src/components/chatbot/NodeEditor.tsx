
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit } from "lucide-react";

type FlowNode = {
  id: string;
  name: string;
  type: "message" | "question" | "intent" | "handoff";
};

interface NodeEditorProps {
  selectedNode: FlowNode | null;
  onUpdateNode: () => void;
}

export function NodeEditor({ selectedNode, onUpdateNode }: NodeEditorProps) {
  if (!selectedNode) return null;
  
  return (
    <div className="border rounded-lg p-4 bg-white">
      <h3 className="font-medium mb-4">Thuộc tính</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="node-name">Tên nút</Label>
          <Input
            id="node-name"
            value={selectedNode.name}
            onChange={() => {}}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="node-type">Loại nút</Label>
          <Select defaultValue={selectedNode.type}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn loại nút" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="message">Tin nhắn</SelectItem>
              <SelectItem value="question">Câu hỏi</SelectItem>
              <SelectItem value="intent">Ý định</SelectItem>
              <SelectItem value="handoff">Chuyển tiếp</SelectItem>
              <SelectItem value="condition">Điều kiện</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="node-content">Nội dung</Label>
          <Textarea
            id="node-content"
            placeholder="Nhập nội dung tin nhắn hoặc câu hỏi..."
            className="min-h-[100px]"
          />
        </div>
        {selectedNode.type === "intent" && (
          <div className="space-y-2">
            <Label htmlFor="intent-select">Ý định</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Chọn ý định" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="product_info">
                  Thông tin sản phẩm
                </SelectItem>
                <SelectItem value="order_status">
                  Trạng thái đơn hàng
                </SelectItem>
                <SelectItem value="return_policy">
                  Chính sách đổi trả
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        <div className="flex items-center space-x-2 pt-2">
          <Switch id="required" />
          <Label htmlFor="required">Bắt buộc</Label>
        </div>
        <div className="pt-4">
          <Button className="w-full" size="sm" onClick={onUpdateNode}>
            <Edit className="mr-2 h-4 w-4" />
            Cập nhật nút
          </Button>
        </div>
      </div>
    </div>
  );
}
