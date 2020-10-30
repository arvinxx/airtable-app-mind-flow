import G6 from '@antv/g6';
import { GraphOptions } from '@antv/g6/lib/types';

const minimap = new G6.Minimap({
  size: [140, 100],
  className: 'minimap',
  type: 'delegate',
});

export const defaultConfig: Omit<GraphOptions, 'container'> = {
  width: 1600,
  height: 800,
  modes: {
    default: ['zoom-canvas', 'drag-canvas'],
  },
  plugins: [minimap],
  fitView: false,
  fitViewPadding: [16, 16, 16, 16],
  animate: true,
  layout: {
    type: 'compactBox',
    direction: 'LR',
    getVGap: function getVGap() {
      return 36;
    },
    getHGap: function getHGap() {
      return 280;
    },
  },
  defaultNode: {
    type: 'flow-rect',
  },
  defaultEdge: {
    type: 'cubic-horizontal',
    style: {
      width: 2,
      stroke: 'rgba(0,0,0,0.15)',
    },
  },
};
