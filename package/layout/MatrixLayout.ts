import Layout, { Transport } from './Layout';
import Vector2d from '../utils/Vector2d';

/**
 * 行列布局
 */
export class MatrixLayout extends Layout {

  /**
   * 行数
   */
  rows = 0;

  /**
   * 行间隙
   */
  rowGap = 10;

  /**
   * 列数
   */
  columns = 0;

  /**
   * 列间隙
   */
  columnGap = 10;

  /**
   * 节点半径
   */
  nodeRadius = 50;

  /**
   * 布局过渡时间
   */
  duration = 0;

  transports: Transport[] = [];

  layout() {
    this.canvas.layout = this;
    const nodes = this.canvas.rootNode.children;
    const count = nodes.length;
    if (count === 0) return;
    this.transports = [];
    let rows = 0;
    let columns = 0;
    if (this.rows > 0) {
      rows = this.rows;
      columns = Math.ceil(count / rows);
    } else if (this.columns > 0) {
      columns = this.columns;
      rows = Math.ceil(count / columns);
    } else {
      rows = Math.ceil(Math.sqrt(count));
      columns = Math.ceil(count / rows);
    }
    const totalWidth = columns * this.nodeRadius * 2 + (columns - 1) * this.columnGap;
    const totalHeight = rows * this.nodeRadius * 2 + (rows - 1) * this.rowGap;
    const origin = new Vector2d(
      (this.canvas.canvasWidth - totalWidth) / 2 + this.nodeRadius,
      (this.canvas.canvasHeight - totalHeight) / 2 + this.nodeRadius
    );

    for /* 行 */ (let r = 1; r <= rows; r++) {
      for /* 列 */ (let c = 1; c <= columns; c++) {
        const node = nodes[(r - 1) * columns + c - 1];
        if (!node) break;
        const transport = new Transport();
        transport.node = node;
        transport.destination.copy(origin);
        transport.destination.x += (c - 1) * (this.nodeRadius * 2 + this.columnGap);
        transport.destination.y += (r - 1) * (this.nodeRadius * 2 + this.rowGap);
        transport.duration = this.duration;
        this.transports.push(transport);
      }
    }

    this.canvas.repaint = true;
  }
}

export default MatrixLayout;
