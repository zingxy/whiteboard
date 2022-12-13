import { ShapeType } from "../../typing";
import { nanoid } from "nanoid";
type Tool = {
  id: string;
  name: ToolName;
  icon: React.ReactNode;
};
export type ToolName = "Selection" | "Pen" | ShapeType;

/**
 * 工具栏的工具
 */

export const TOOLS: Tool[] = [
  {
    id: nanoid(),
    name: "Selection",
    icon: (
      <svg width="1em" height="1em" viewBox="0 0 256 256">
        <path
          fill="currentColor"
          d="M197.7 197.7a8.2 8.2 0 0 1-11.4 0L116 127.3l-46.3 46.4A8.3 8.3 0 0 1 64 176a8.5 8.5 0 0 1-3.1-.6A8 8 0 0 1 56 168V64a8 8 0 0 1 8-8h104a8 8 0 0 1 7.4 4.9a8.4 8.4 0 0 1-1.7 8.8L127.3 116l70.4 70.3a8.1 8.1 0 0 1 0 11.4Z"
        ></path>
      </svg>
    ),
  },
  {
    id: nanoid(),
    name: "Pen",
    icon: "~",
  },
  {
    id: nanoid(),
    name: "Rect",
    icon: (
      <svg width="1em" height="1em" viewBox="0 0 24 24">
        <path fill="currentColor" d="M2 4v16h20V4H2zm18 14H4V6h16v12z"></path>
      </svg>
    ),
  },
  {
    id: nanoid(),
    name: "Circle",
    icon: (
      <svg width="1em" height="1em" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M12 20a8 8 0 0 1-8-8a8 8 0 0 1 8-8a8 8 0 0 1 8 8a8 8 0 0 1-8 8m0-18A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2Z"
        ></path>
      </svg>
    ),
  },
  {
    id: nanoid(),
    name: "Triangle",
    icon: "^",
  },
];
