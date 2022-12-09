import { useContext } from "react";
import { CanvasContext } from "./WhiteBoard";
export default function useCanvas() {
  return useContext(CanvasContext);
}
