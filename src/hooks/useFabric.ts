import { fabric } from "fabric";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function useFabric() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

  useLayoutEffect(() => {
    const instance = new fabric.Canvas(canvasRef.current, {
      interactive: true,
      backgroundColor: "pink",
      width: window.innerWidth,
      height: window.innerHeight,
    });
    setCanvas(instance);
    return () => {
      instance.dispose();
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      canvas?.setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return [canvasRef, canvas] as const;
}
