import useFabric from "../../hooks/useFabric";
import Canvas from "../../utils/Canvas";
import React, { createContext } from "react";

export const CanvasContext = createContext<Canvas | null>(null);

interface WhiteBoardProps {
  children?: React.ReactNode;
  width?: number;
  height?: number;
}

export default function WhiteBoard({ children }: WhiteBoardProps) {
  const [canvasRef, canvas] = useFabric();

  return (
    <div
      className="whiteboard"
      style={{
        position: "relative",
        userSelect: "none",
      }}
      onKeyDown={(e) => {
        if (e.key === "Backspace" && canvas) {
          console.log("backspace");
          canvas.backspace();
        }
      }}
      tabIndex={1}
    >
      <canvas ref={canvasRef}  />
      <CanvasContext.Provider value={canvas}>{children}</CanvasContext.Provider>
    </div>
  );
}
