import Vector2d from '../utils/Vector2d';
import Element from '../element/Element';
import Math2d from '../utils/Math2d';

export class PathAnimate {
  path: Vector2d[] = [];
  element: Element | null = null;
  duration = 1000;
  progress = 0;
  private _lastPoint: Vector2d | null = null;

  update(timeDelta: number) {
    if (!this.element) return;
    if (this.duration <= 0) return;
    this.progress += timeDelta / this.duration;
    this.progress %= 1;
    const currentPoint = Math2d.getLinePoint(this.path, this.progress);
    if (!currentPoint) return;
    if (this._lastPoint) {
      const rotate = currentPoint.clone().substract(this._lastPoint).xAxisAngle();
      this.element.rotate = rotate;
      this.element.position.copy(currentPoint);
    }
    this._lastPoint = currentPoint;
  }
  render(ctx: CanvasRenderingContext2D) {
    if (!this.element) return;
    if (this.duration <= 0) return;
    this.element.render(ctx);
  }
}

export default PathAnimate;
