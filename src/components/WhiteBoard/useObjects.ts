import { useRef, useCallback, useSyncExternalStore } from "react";
import useCanvas from "./useCanvas";
/**
 *
 * @returns 返回当前Canvas中所有的对象
 */
export default function useObjects() {
  const canvas = useCanvas();
  const shapesRef = useRef<fabric.Object[]>([]);
  const shapes = useSyncExternalStore(
    useCallback(
      (callback) => {
        const handler = () => {
          shapesRef.current = [];
          callback();
        };
        canvas?.on("object:added", handler);
        canvas?.on("object:removed", handler);
        return () => {
          canvas?.off("object:added", handler);
          canvas?.off("object:removed", handler);
        };
      },
      [canvas]
    ),
    () => {
      shapesRef.current.length = 0;
      shapesRef.current.push(...(canvas?.getObjects() ?? []));

      return shapesRef.current;
    }
  );
  return shapes;
}
