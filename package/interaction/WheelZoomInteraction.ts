import Interaction from './Interaction';
import Canvas from '../core/Canvas';
import Vector2d from '../utils/Vector2d';
/**
 * 滚轮缩放
 */
export class WheelZoomInteraction extends Interaction {
  onWheel = (canvas: Canvas, e: Event) => {
    const { deltaY, clientX, clientY } = e as WheelEvent;
    e.preventDefault();
    if (deltaY > 0) {
      canvas.zoomOut(new Vector2d(clientX, clientY));
    } else {
      canvas.zoomIn(new Vector2d(clientX, clientY));
    }
  };

  handleEvent(canvas: Canvas, event: Event) {
    switch (event.type) {
      case 'wheel':
        this.onWheel(canvas, event);
        break;
    }
  }
}

export const wheelZoomInteraction = new WheelZoomInteraction();
export default WheelZoomInteraction;
