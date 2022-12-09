import useFabric from "../../hooks/useFabric";

import React, { createContext } from "react";

export const CanvasContext = createContext<fabric.Canvas | null>(null);

export default function WhiteBoard({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [canvasRef, canvas] = useFabric();

  return (
    <>
      <canvas ref={canvasRef} />
      <CanvasContext.Provider value={canvas}>{children}</CanvasContext.Provider>
    </>
  );
}
