import { useCallback } from "react";
import { fabric } from "fabric";
/**
 *
 * @param canvas fabric.Canvas对象
 * @returns 事件处理函数handler，当按下鼠标时开始drawShapeStart, 松开鼠标时drawShapeEnd
 */
// 事件处理没法取消
export default function useDrawShapeHandler(canvas: fabric.Canvas | null) {
  const handler = useCallback(() => {
    if (!canvas) {
      return;
    }
    // TODO setMode('drawshape')
    canvas.selection = false;
    canvas.forEachObject((o) => {
      o.selectable = false;
      o.evented = false;
    });
    canvas.renderAll();
    let from = {
      x: 0,
      y: 0,
    };
    let to = {
      x: 0,
      y: 0,
    };
    let currentShape: fabric.Object | null = null;

    // 鼠标是否移动过
    let moved = false;
    const handleMouseDown = (o: fabric.IEvent<Event>) => {
      if (!canvas) {
        return;
      }
      const pointer = canvas?.getPointer(o.e) ?? { x: 0, y: 0 };

      from = pointer;
      currentShape = new fabric.Rect({
        left: from.x,
        top: from.y,
        stroke: "black",
        strokeWidth: 3,
        strokeUniform: true,
        fill: "",
        width: 0,
        height: 0,
      });
      canvas.setActiveObject(currentShape);
      canvas.add(currentShape);
      canvas.on("mouse:move", handleMouseMove);
      canvas.on("mouse:up", hanldeMouseUp);
    };

    const handleMouseMove = (o: fabric.IEvent<Event>) => {
      if (!canvas || !currentShape) {
        return;
      }
      moved = true;
      const pointer = canvas.getPointer(o.e) ?? { x: 0, y: 0 };
      to = pointer;

      const offsetX = to.x - from.x;
      const offsetY = to.y - from.y;
      if (offsetX < 0 && offsetY < 0) {
        currentShape.set("left", pointer.x);
        currentShape.set("top", pointer.y);
      }
      if (offsetX > 0 && offsetY < 0) {
        currentShape.set("left", from.x);
        currentShape.set("top", pointer.y);
      }

      if (offsetX < 0 && offsetY > 0) {
        currentShape.set("left", pointer.x);
        currentShape.set("top", from.y);
      }
      if (offsetX > 0 && offsetY > 0) {
        currentShape.set("left", from.x);
        currentShape.set("top", from.y);
      }
      currentShape.set("width", Math.abs(offsetX));
      currentShape.set("height", Math.abs(offsetY));

      canvas.requestRenderAll();
    };

    const hanldeMouseUp = (o: fabric.IEvent<Event>) => {
      if (!canvas) {
        return;
      }
      if (!moved && currentShape) {
        currentShape.set({
          width: 100,
          height: 100,
        });
      }
      canvas.selection = true;
      canvas.forEachObject((o) => {
        o.selectable = true;
        o.evented = true;
      });

      moved = false;
      currentShape = null;
      canvas.off("mouse:down", handleMouseDown);
      canvas.off("mouse:move", handleMouseMove);
      canvas.off("mouse:up", hanldeMouseUp);
      canvas.renderAll();
    };

    canvas.on("mouse:down", handleMouseDown);
  }, [canvas]);

  return handler;
}
