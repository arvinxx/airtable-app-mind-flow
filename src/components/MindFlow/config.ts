import G6 from '@antv/g6';
import { GraphOptions } from '@antv/g6/lib/types';
import { getHeightByInfoLength, FlowNode } from './shapes/node';

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
        formatText(model: FlowNode) {
          return `
            <div>
            <div class="g6-tooltip-title">🚩 ${model.name}</div>
           ${
             model.description
               ? `<div class="g6-tooltip-description">${model.description}</div>`
               : ''
           }
           ${
             model.information.length > 0
               ? `<div>
<div class="g6-tooltip-information">💡 相关信息源/场景/前置条件</div>
${model.information
  .map((info) => `<div class="g6-tooltip-info-item">· ${info.name}</div>`)
  .join('')}</div>`
               : ''
           }</div>
          `;
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
