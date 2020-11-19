import { EdgeRegisterDefinition } from '../types';
import { ModelConfig } from '@antv/g6/es/types';

const colorMap = {
  name1: '#72CC4A',
  name2: '#1A91FF',
  name3: '#FFAA15',
};

interface PolylineConfig extends ModelConfig {
  data: {
    type: string;
  };
}

/**
 * 节点对象
 */
const polyline: EdgeRegisterDefinition = {
  type: 'edge',
  name: 'polyline',
  definition: {
    itemType: 'edge',

    draw: function draw(cfg: PolylineConfig, group) {
      const startPoint = cfg.startPoint;
      const endPoint = cfg.endPoint;

      const Ydiff = endPoint.y - startPoint.y;

      const slope = Ydiff !== 0 ? 500 / Math.abs(Ydiff) : 0;

      const cpOffset = 16;
      const offset = Ydiff < 0 ? cpOffset : -cpOffset;

      const line1EndPoint = {
        x: startPoint.x + slope,
        y: endPoint.y + offset,
      };
      const line2StartPoint = {
        x: line1EndPoint.x + cpOffset,
        y: endPoint.y,
      };

      // 控制点坐标
      const controlPoint = {
        x:
          ((line1EndPoint.x - startPoint.x) * (endPoint.y - startPoint.y)) /
            (line1EndPoint.y - startPoint.y) +
          startPoint.x,
        y: endPoint.y,
      };

      let path = [
        ['M', startPoint.x, startPoint.y],
        ['L', line1EndPoint.x, line1EndPoint.y],
        [
          'Q',
          controlPoint.x,
          controlPoint.y,
          line2StartPoint.x,
          line2StartPoint.y,
        ],
        ['L', endPoint.x, endPoint.y],
      ];

      if (Ydiff === 0) {
        path = [
          ['M', startPoint.x, startPoint.y],
          ['L', endPoint.x, endPoint.y],
        ];
      }

      return group.addShape('path', {
        attrs: {
          path,
          stroke: colorMap[cfg?.data.type],
          lineWidth: 1.2,
          endArrow: false,
        },
      });
    },
  },
};
export default polyline;
