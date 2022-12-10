import useFabric from "../../hooks/useFabric";

import React, { createContext } from "react";

export const CanvasContext = createContext<fabric.Canvas | null>(null);

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
      }}
    >
      <canvas ref={canvasRef} />
      <CanvasContext.Provider value={canvas}>{children}</CanvasContext.Provider>
    </div>
  );
}
