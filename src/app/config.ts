import G6 from '@antv/g6';
import { GraphOptions } from '@antv/g6/lib/types';
import { getHeightByInfoLength, FlowNode } from './shapes/node';
import tooltip from './shapes/tooltip';

const minimap = new G6.Minimap({
  size: [140, 100],
  className: 'minimap',
  type: 'delegate',
});
const toolbar = new G6.ToolBar();

export const defaultConfig: Omit<GraphOptions, 'container'> = {
  width: 1600,
  height: 800,
  modes: {
    default: [
      'zoom-canvas',
      'drag-canvas',
      {
        type: 'tooltip', // 提示框
        // 提示框文本内容
        offset: 16,
        formatText: tooltip,
        shouldBegin: ({ target }) => {
          const { cfg } = target;
          return cfg?.name !== 'collapse-icon';
        },
      },
    ],
  },
  plugins: [minimap, toolbar],
  fitView: true,
  fitViewPadding: 8,
  animate: false,
  layout: {
    type: 'compactBox',
    direction: 'LR',
    getWidth: () => 200,
    getHeight: (node: FlowNode) =>
      getHeightByInfoLength(node?.information.length),
    // 间距
    getVGap: () => 16,
    getHGap: () => 64,
  },
  defaultNode: {
    type: 'flow-node',
  },
  defaultEdge: {
    type: 'cubic-horizontal',
    style: {
      width: 2,
      stroke: 'rgba(0,0,0,0.15)',
    },
  },
};
