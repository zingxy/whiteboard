import { useContext } from "react";
import { CanvasContext } from "./WhiteBoard";
/**
 *
 * @returns 获取fabric.Canvas对象
 */
export default function useCanvas() {
  return useContext(CanvasContext);
}
