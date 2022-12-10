import { tools } from "../global_constant";
import useCanvas from "../WhiteBoard/useCanvas";

import { fabric } from "fabric";
import { useCallback, useEffect, useRef, useState } from "react";
import useObjects from "../WhiteBoard/useObjects";
import useDrawShapeHandler from "./useDrawShapeHandler";
export default function Toolbar() {
  const canvas = useCanvas();
  const objects = useObjects();
  const drawShapeHandler = useDrawShapeHandler(canvas);
  return (
    <section
      style={{
        position: "absolute",
        top: 0,
        
      }}
    >
      <button
        onClick={() => {
          drawShapeHandler();
        }}
      >
        draw
      </button>
      <ul>
        {objects.map((o) => {
          return <li key={o.toString()}>shape</li>;
        })}
      </ul>
    </section>
  );
}
