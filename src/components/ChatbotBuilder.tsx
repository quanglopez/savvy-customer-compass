
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Settings, Sliders } from "lucide-react";
import { FlowNodesList } from "@/components/chatbot/FlowNodesList";
import { NodeEditor } from "@/components/chatbot/NodeEditor";
import { FlowDesigner } from "@/components/chatbot/FlowDesigner";
import { IntentsList } from "@/components/chatbot/IntentsList";
import { EntitiesList } from "@/components/chatbot/EntitiesList";
import { ChatbotSettings } from "@/components/chatbot/ChatbotSettings";
import { ChatbotHeader } from "@/components/chatbot/ChatbotHeader";
import { FlowNode } from "@/components/chatbot/types";

export function ChatbotBuilder() {
  const [flowNodes, setFlowNodes] = useState<FlowNode[]>([
    { id: "welcome", name: "Chào mừng", type: "message" },
    { id: "ask_question", name: "Hỏi vấn đề", type: "question" },
    { id: "product_info", name: "Thông tin sản phẩm", type: "intent" },
    { id: "order_status", name: "Trạng thái đơn hàng", type: "intent" },
    { id: "human_handoff", name: "Chuyển nhân viên", type: "handoff" },
  ]);

  const [selectedNode, setSelectedNode] = useState<FlowNode>(flowNodes[0]);

  const handleAddNode = () => {
    // Implementation for adding a new node
    console.log("Adding new node");
  };

  const handleUpdateNode = () => {
    // Implementation for updating a node
    console.log("Updating node:", selectedNode.id);
  };
  
  const handleTestChatbot = () => {
    console.log("Testing chatbot");
  };
  
  const handlePublishChatbot = () => {
    console.log("Publishing chatbot");
  };

  return (
    <div className="animate-fade-in">
      <ChatbotHeader 
        onTest={handleTestChatbot}
        onPublish={handlePublishChatbot}
      />

      <Tabs defaultValue="flow" className="space-y-4">
        <TabsList>
          <TabsTrigger value="flow">Luồng hội thoại</TabsTrigger>
          <TabsTrigger value="intents">Ý định</TabsTrigger>
          <TabsTrigger value="entities">Thực thể</TabsTrigger>
          <TabsTrigger value="settings">Cài đặt</TabsTrigger>
        </TabsList>

        <TabsContent value="flow" className="space-y-4">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-3">
              <FlowNodesList
                nodes={flowNodes}
                selectedNode={selectedNode}
                onSelectNode={setSelectedNode}
                onAddNode={handleAddNode}
              />
            </div>

            <div className="col-span-6">
              <FlowDesigner />
            </div>

            <div className="col-span-3">
              <NodeEditor
                selectedNode={selectedNode}
                onUpdateNode={handleUpdateNode}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="intents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ý định</CardTitle>
            </CardHeader>
            <CardContent>
              <IntentsList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="entities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thực thể</CardTitle>
            </CardHeader>
            <CardContent>
              <EntitiesList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt chatbot</CardTitle>
            </CardHeader>
            <CardContent>
              <ChatbotSettings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ChatbotBuilder;
