import { fabric } from "fabric";
import Canvas from "../utils/Canvas";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function useFabric() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);

  useLayoutEffect(() => {
    const instance = new Canvas(canvasRef.current, {
      interactive: true,
      width: window.innerWidth,
      height: window.innerHeight,
    });
    instance.perPixelTargetFind = true;
    instance.uniformScaling = true;
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
