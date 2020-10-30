import G6 from '@antv/g6';
import { GraphOptions } from '@antv/g6/lib/types';
import { getHeightByInfoLength, FlowRectNode } from './shapes/flowRect';

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
  fitView: true,
  fitViewPadding: 8,
  animate: false,
  layout: {
    type: 'compactBox',
    direction: 'LR',
    getWidth: () => 200,
    getHeight: (node: FlowRectNode) =>
      getHeightByInfoLength(node?.information.length),
    // 间距
    getVGap: () => 16,
    getHGap: () => 64,
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
