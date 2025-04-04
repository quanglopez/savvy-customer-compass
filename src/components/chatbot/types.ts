
export type FlowNode = {
  id: string;
  name: string;
  type: "message" | "question" | "intent" | "handoff";
};
