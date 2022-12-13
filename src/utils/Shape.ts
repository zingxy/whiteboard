import { fabric } from "fabric";

export abstract class Shape<
  T extends fabric.Object = fabric.Object,
  O extends fabric.IObjectOptions = fabric.IObjectOptions
> {
  // fabric.Object
  instance: T;
  top: number;
  left: number;
  // drawShape模式下更新
  updateShape(left: number, top: number, width: number, height: number) {
    this.updatePosition(left, top);
    this.updateSize(width, height);
  }
  updatePosition(left: number, top: number): void {
    this.instance.set("top", top);
    this.instance.set("left", left);
  }

  abstract updateSize(width: number, height: number): void;
}

export class RectShape extends Shape<fabric.Rect, fabric.IRectOptions> {
  constructor(options: fabric.IRectOptions) {
    super();
    this.instance = new fabric.Rect(options);
  }

  updateSize(width: number, height: number): void {
    this.instance.set("width", width);
    this.instance.set("height", height);
  }
}
export class CircleShape extends Shape<fabric.Circle, fabric.ICircleOptions> {
  constructor(options: fabric.ICircleOptions) {
    super();
    this.instance = new fabric.Circle(options);
  }

  updateSize(width: number, height: number): void {
    const max = Math.max(width, height);
    const r = max / 2;

    this.instance.set({
      radius: r,
      width: max,
      height: max,
    });
  }
}

export class TriangleShape extends Shape<
  fabric.Triangle,
  fabric.ITriangleOptions
> {
  constructor(options: fabric.ITriangleOptions) {
    super();
    this.instance = new fabric.Triangle(options);
  }

  updateSize(width: number, height: number): void {
    this.instance.set("width", width);
    this.instance.set("height", height);
  }
}
