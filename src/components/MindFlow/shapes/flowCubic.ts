import { IPoint, ModelConfig } from '@antv/g6/es/types';
import { INode } from '@antv/g6/es/interface/item';
import { ShapeRegisterDefinition } from '../types';

interface FlowCubicConfig extends ModelConfig {
  controlPoints: IPoint[];
}

/**
 * 三次贝塞尔曲线
 */
const flowCubic: ShapeRegisterDefinition = {
  type: 'edge',
  name: 'flow-cubic',
  definition: {
    itemType: 'edge',
    getControlPoints(cfg: FlowCubicConfig) {
      let controlPoints = cfg.controlPoints; // 指定controlPoints

      if (!controlPoints || !controlPoints.length) {
        const { startPoint, endPoint, sourceNode, targetNode } = cfg;

        // @ts-ignore
        const { x: startX, y: startY, coefficientX, coefficientY } = sourceNode
          ? (sourceNode as INode).getModel()
          : startPoint;

        const { x: endX, y: endY } = targetNode
          ? (targetNode as INode).getModel()
          : endPoint;

        let curveStart = (endX - startX) * coefficientX;
        let curveEnd = (endY - startY) * coefficientY;

        curveStart = curveStart > 40 ? 40 : curveStart;
        curveEnd = curveEnd < -30 ? curveEnd : -30;

        controlPoints = [
          { x: startPoint.x + curveStart, y: startPoint.y },
          { x: endPoint.x + curveEnd, y: endPoint.y },
        ];
      }

      return controlPoints;
    },
    getPath(points) {
      const path = [];
      path.push(['M', points[0].x, points[0].y]);
      path.push([
        'C',
        points[1].x,
        points[1].y,
        points[2].x,
        points[2].y,
        points[3].x,
        points[3].y,
      ]);
      return path;
    },
  },
  extendShapeType: 'single-line',
};
export default flowCubic;
