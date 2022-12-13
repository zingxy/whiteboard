import { useState } from "react";

import useCanvas from "../WhiteBoard/useCanvas";
import useObjects from "../WhiteBoard/useObjects";
import { Radio } from "antd";

import { TOOLS } from "./constant";
import type { ToolName } from "./constant";
export default function Toolbar() {
  const canvas = useCanvas();
  const objects = useObjects();
  const [currentTool, setCurrentTool] = useState<ToolName>("Selection");
  const onToolChange = (tool: ToolName) => {
    switch (tool) {
      case "Selection": {
        canvas.setMode("select");
        break;
      }
      case "Pen": {
        canvas.setMode("draw");
        break;
      }
      case "Rect": {
        canvas.setMode("drawShape");
        canvas.setCurrentShape("Rect");
        break;
      }
      case "Circle": {
        canvas.setMode("drawShape");
        canvas.setCurrentShape("Circle");
        break;
      }
      case "Triangle": {
        canvas.setMode("drawShape");
        canvas.setCurrentShape("Triangle");
        break;
      }
    }
  };

  return (
    <section
      style={{
        position: "absolute",
        top: "3rem",
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Radio.Group
        defaultValue={"Selection"}
        buttonStyle="outline"
        value={currentTool}
      >
        {TOOLS.map((t) => {
          return (
            <Radio.Button
              key={t.id}
              value={t.name}
              onClick={() => {
                onToolChange(t.name);
                setCurrentTool(t.name);
              }}
            >
              {t.icon}
            </Radio.Button>
          );
        })}
      </Radio.Group>
    </section>
  );
}
