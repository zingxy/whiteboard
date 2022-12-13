import { fabric } from "fabric";

import type { ShapeType } from "../typing";

import { CircleShape, RectShape, Shape, TriangleShape } from "./Shape";
type CanvasMode = "select" | "drawShape" | "draw";
type Point = {
  x: number;
  y: number;
};

export default class Canvas extends fabric.Canvas {
  public mode: CanvasMode = "select";

  // 用于drawShape模式
  private currentShape: Shape | null = null;
  private from: Point = { x: 0, y: 0 };
  private to: Point = { x: 0, y: 0 };
  constructor(
    element: HTMLCanvasElement | null,
    options: fabric.ICanvasOptions
  ) {
    super(element, options);
    this.setMode("select");
    this.onDrawShpae();
  }
  /**
   * @param mode 设置当前Canvas模式
   * select: 允许选中并修改
   * draw: 自由绘制
   * drawshape: 从工具栏拖动图形
   */
  setMode(mode: "select" | "drawShape" | "draw") {
    switch (mode) {
      case "select": {
        // 这个模式可以选中元素/输入文本等
        this.isDrawingMode = false;
        this.mode = "select";
        this.selection = true;
        this.selectionColor = "";
        this.selectionBorderColor = "blue";
        this.defaultCursor = "default";

        this.forEachObject((o) => {
          // 可以被选中
          o.selectable = true;
          o.evented = true;
        });
        break;
      }
      case "draw": {
        // 自由绘制模式
        this.mode = "draw";
        this.isDrawingMode = true;
        this.defaultCursor = "crosshair";

        break;
      }
      case "drawShape": {
        this.mode = "drawShape";
        this.isDrawingMode = false;
        this.selectionColor = "";
        this.selectionBorderColor = "";
        this.defaultCursor = "crosshair";
        this.forEachObject((o) => {
          // 不可被选中
          o.selectable = false;
          // 不可响应事件
          o.evented = false;
        });

        break;
      }
      default: {
        //
      }
    }
    this.renderAll();
  }
  /**
   *
   * @param type 根据传入的类型执行初始化
   */
  setCurrentShape(type: ShapeType) {
    this.renderAll();
    switch (type) {
      case "Rect": {
        this.currentShape = new RectShape({
          width: 0,
          height: 0,
          stroke: "red",
          strokeWidth: 4,
          fill: "",
        });
        break;
      }
      case "Circle": {
        this.currentShape = new CircleShape({
          radius: 0,
          stroke: "red",
          fill: "",
          strokeWidth: 4,
        });

        break;
      }
      case "Triangle": {
        this.currentShape = new TriangleShape({
          width: 0,
          height: 0,
          stroke: "black",
          strokeWidth: 4,
          fill: "",
        });

        break;
      }
    }
  }
  /**
   * 用于select模式按下删除键
   */
  public backspace() {
    // 必须要在select模式
    if (this.mode !== "select") {
      return;
    }
    const objects = this.getActiveObjects();
    this.remove(...objects);
  }

  /**
   * 启动drapShape模式
   */
  public onDrawShpae() {
    this.on("mouse:down", this.drawShapeStart);
    this.on("mouse:move", this.drawShapeMove);
    this.on("mouse:up", this.drawShapeEnd);
  }
  public offDrawShpe() {
    this.off("mouse:down", this.drawShapeStart);
    this.off("mouse:move", this.drawShapeMove);
    this.off("mouse:up", this.drawShapeEnd);
  }

  private drawShapeStart(o: fabric.IEvent<Event>) {
    if (!this.currentShape || this.mode !== "drawShape") {
      return;
    }
    // 设置起点
    const point = this.getPointer(o.e);
    this.from = point;
    // 初始化
    this.currentShape.updateShape(this.from.x, this.from.y, 0, 0);
    // 添加
    this.add(this.currentShape.instance);
  }
  private drawShapeMove(o: fabric.IEvent<Event>) {
    if (!this.currentShape || this.mode !== "drawShape") {
      return;
    }
    const point = this.getPointer(o.e);
    this.to = point;

    const offsetX = this.to.x - this.from.x;
    const offsetY = this.to.y - this.from.y;
    let left = 0;
    let top = 0;
    if (offsetX < 0 && offsetY < 0) {
      left = this.to.x;
      top = this.to.y;
    }
    if (offsetX > 0 && offsetY < 0) {
      left = this.from.x;

      top = this.to.y;
    }

    if (offsetX < 0 && offsetY > 0) {
      left = this.to.x;

      top = this.from.y;
    }
    if (offsetX > 0 && offsetY > 0) {
      left = this.from.x;

      top = this.from.y;
    }

    this.currentShape.updateShape(
      left,
      top,
      Math.abs(offsetX),
      Math.abs(offsetY)
    );

    this.requestRenderAll();
  }
  private drawShapeEnd() {
    if (!this.currentShape || this.mode !== "drawShape") {
      return;
    }
    if (this.from.x === this.to.x) {
      this.currentShape.updateShape(this.from.x, this.from.y, 100, 100);
      this.renderAll();
    }

    this.setActiveObject(this.currentShape.instance);
    this.currentShape = null;
    this.from = this.to = { x: 0, y: 0 };
    // 恢复到select模式
    this.setMode("select");
  }
}
