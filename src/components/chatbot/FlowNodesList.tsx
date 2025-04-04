
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Plus, Sparkles, Zap } from "lucide-react";

type FlowNode = {
  id: string;
  name: string;
  type: "message" | "question" | "intent" | "handoff";
};

interface FlowNodesListProps {
  nodes: FlowNode[];
  selectedNode: FlowNode;
  onSelectNode: (node: FlowNode) => void;
  onAddNode: () => void;
}

export function FlowNodesList({ nodes, selectedNode, onSelectNode, onAddNode }: FlowNodesListProps) {
  return (
    <div className="border rounded-lg p-4 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Các nút</h3>
        <Button variant="ghost" className="h-8 w-8 p-0" size="sm">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-2">
        {nodes.map((node) => (
          <div
            key={node.id}
            className={`p-3 border rounded-md cursor-pointer hover:bg-accent transition-colors ${
              selectedNode.id === node.id
                ? "border-primary bg-accent"
                : ""
            }`}
            onClick={() => onSelectNode(node)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {node.type === "message" && (
                  <MessageSquare className="h-4 w-4 mr-2 text-blue-500" />
                )}
                {node.type === "question" && (
                  <MessageSquare className="h-4 w-4 mr-2 text-purple-500" />
                )}
                {node.type === "intent" && (
                  <Sparkles className="h-4 w-4 mr-2 text-amber-500" />
                )}
                {node.type === "handoff" && (
                  <Zap className="h-4 w-4 mr-2 text-green-500" />
                )}
                <span className="text-sm font-medium">
                  {node.name}
                </span>
              </div>
              <span className="text-xs text-muted-foreground capitalize">
                {node.type}
              </span>
            </div>
          </div>
        ))}
      </div>
      <Button
        variant="outline"
        className="w-full mt-4"
        size="sm"
        onClick={onAddNode}
      >
        <Plus className="mr-2 h-4 w-4" />
        Thêm nút mới
      </Button>
    </div>
  );
}
