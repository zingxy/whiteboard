import { fabric } from "fabric";
import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

export default function useFabric() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const shapesRef = useRef<fabric.Object[]>([]);
  const shapes = useSyncExternalStore(
    useCallback(
      (callback) => {
        const handler = () => {
          shapesRef.current = [];
          callback();
        };
        canvas?.on("object:added", handler);
        return () => {
          canvas?.off("object:added", handler);
        };
      },
      [canvas]
    ),
    () => {
      shapesRef.current.length = 0;
      shapesRef.current.push(...(canvas?.getObjects() ?? []));

      console.log("getSnapShot");
      return shapesRef.current;
    }
  );

  useLayoutEffect(() => {
    const instance = new fabric.Canvas(canvasRef.current, {
      interactive: true,
      width: 500,
      height: 500,
      backgroundColor: "pink",
    });
    setCanvas(instance);
    return () => {
      instance.dispose();
    };
  }, []);
  return [canvasRef, canvas, shapes] as const;
}
