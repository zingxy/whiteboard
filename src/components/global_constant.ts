export {};

type ToolType = "select" | "brush" | "rect" | "line";

type Tool = {
  id: number;
  type: ToolType;
  icon: string;
};

export const tools: Tool[] = [
  {
    id: 0,
    type: "select",
    icon: "icon-jiantou1",
  },
  {
    id: 1,
    type: "rect",
    icon: "",
  },
];
