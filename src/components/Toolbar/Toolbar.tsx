import { tools } from "../global_constant";
import useCanvas from "../WhiteBoard/useCanvas";

import { fabric } from "fabric";
import { useEffect, useState } from "react";
export default function Toolbar() {
  const canvas = useCanvas();

  const [start, setStart] = useState({
    x: 0,
    y: 0,
  });
  const [end, setEnd] = useState({
    x: 0,
    y: 0,
  });
  const handleMouseUp = (e: fabric.IEvent<Event>) => {
    if (e.pointer) {
      setEnd({ ...e.pointer });
    }
    canvas?.off("mouse:down", handleMouseDown);
    canvas?.off("mouse:move", handleMouseMove);
    canvas?.off("mouse:up", handleMouseUp);
  };
  const handleMouseMove = (e: fabric.IEvent<Event>) => {
    if (e.pointer) {
      setEnd({ ...e.pointer });
    }
  };

  const handleMouseDown = (e: fabric.IEvent<Event>) => {
    if (e.pointer) {
      setStart({ ...e.pointer });
    }
    // mount
    canvas?.on("mouse:up", handleMouseUp);
    canvas?.on("mouse:move", handleMouseMove);
  };

  return (
    <>
      <section>
        <button
          onClick={() => {
            canvas?.on("mouse:down", handleMouseDown);
          }}
        >
          draw
        </button>
        <h1>
          start:[{start.x},{start.y}]
        </h1>
        <h1>
          end:[{end.x},{end.y}]
        </h1>
      </section>
    </>
  );
}
