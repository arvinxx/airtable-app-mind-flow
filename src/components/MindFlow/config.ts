import G6 from '@antv/g6';
import { GraphOptions } from '@antv/g6/lib/types';

const minimap = new G6.Minimap({
  size: [50, 50],
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
  fitView: true,
  fitViewPadding: [16, 16, 16, 16],
  animate: true,
  layout: {
    type: 'compactBox',
    direction: 'LR',
    // getHGap: () => {
    //   return 160;
    // },
    getVGap: function getVGap() {
      return 48;
    },
    getHGap: function getHGap() {
      return 160;
    },
  },
  defaultNode: {
    shape: 'flow-rect',
  },
  defaultEdge: {
    type: 'cubic-horizontal',
    style: {
      stroke: '#929292',
    },
  },
};
