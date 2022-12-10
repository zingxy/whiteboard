import { tools } from "../global_constant";
import useCanvas from "../WhiteBoard/useCanvas";

import { fabric } from "fabric";
import { useCallback, useEffect, useRef, useState } from "react";
export default function Toolbar() {
  const canvas = useCanvas();
  const shapeRef = useRef<fabric.Object | null>(null);

  return (
    <>
      <section>
        <button
          onClick={() => {
            if (!canvas) {
              return;
            }
            canvas.selection = false;
            canvas.forEachObject((o) => {
              o.selectable = false;
            });

            let from = {
              x: 0,
              y: 0,
            };
            let to = {
              x: 0,
              y: 0,
            };

            const handleMouseDown = (o: fabric.IEvent<Event>) => {
              if (!canvas) {
                return;
              }
              const pointer = canvas?.getPointer(o.e) ?? { x: 0, y: 0 };

              from = pointer;
              shapeRef.current = new fabric.Triangle({
                left: from.x,
                top: from.y,
                stroke: "black",
                fill: "",
                width: 0,
                height: 0,
              });
              canvas.add(shapeRef.current);

              canvas.on("mouse:move", handleMouseMove);
              canvas.on("mouse:up", hanldeMouseUp);
            };

            const handleMouseMove = (o: fabric.IEvent<Event>) => {
              const pointer = canvas?.getPointer(o.e) ?? { x: 0, y: 0 };
              to = pointer;
              const offsetX = to.x - from.x;
              const offsetY = to.y - from.y;
              console.log(offsetX, offsetY);
              if (offsetX < 0 && offsetY < 0) {
                console.log("左上");
                shapeRef.current?.set("left", pointer.x);
                shapeRef.current?.set("top", pointer.y);
              }
              if (offsetX > 0 && offsetY < 0) {
                console.log("右上");
                shapeRef.current?.set("left", from.x);
                shapeRef.current?.set("top", pointer.y);
              }

              if (offsetX < 0 && offsetY > 0) {
                console.log("左下");
                shapeRef.current?.set("left", pointer.x);
                shapeRef.current?.set("top", from.y);
              }
              if (offsetX > 0 && offsetY > 0) {
                console.log("右下");
                shapeRef.current?.set("left", from.x);
                shapeRef.current?.set("top", from.y);
              }
              shapeRef.current?.set("width", Math.abs(offsetX));
              shapeRef.current?.set("height", Math.abs(offsetY));

              canvas?.requestRenderAll();
            };

            const hanldeMouseUp = (o: fabric.IEvent<Event>) => {
              if (!canvas) return;
              canvas.off("mouse:down", handleMouseDown);
              canvas.off("mouse:move", handleMouseMove);
              canvas.off("mouse:up", hanldeMouseUp);
              canvas.selection = true;
              canvas.forEachObject((o) => {
                o.selectable = true;
              });
            };

            shapeRef.current = null;
            canvas?.on("mouse:down", handleMouseDown);
          }}
        >
          draw
        </button>
      </section>
    </>
  );
}
