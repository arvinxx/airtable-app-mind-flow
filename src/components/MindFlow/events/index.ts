// 事件绑定
import { Graph } from '@antv/g6';
import { nodeHoverState } from './nodeHoverState';

export const initEvent = (graph: Graph) => {
  nodeHoverState(graph);

  // graph.on('node:mouseenter', (evt: any) => {
  //   const node = evt.item;
  //   graph.setItemState(node, 'hover', true);
  //   graph.updateItem(node, {
  //     style: {
  //       ...node._cfg.originStyle,
  //       shadowColor: '#bbb',
  //       shadowBlur: 6,
  //     },
  //   });
  // });
  //
  // graph.on('node:mousemove', (evt: any) => {
  //   if (isAnimating) {
  //     return;
  //   }
  //   const { item, target, x, y } = evt;
  //   const {
  //     attrs: { isTitleShape },
  //   } = target;
  //   const model = item.getModel();
  //   const { name, id } = model;
  //   if (isTitleShape) {
  //     const postion = graph.getClientByPoint(x, y);
  //     createTooltip(postion, name, id);
  //   } else {
  //     removeTooltip(id);
  //   }
  // });

  // graph.on('node:mouseout', (evt: any) => {
  //   if (isAnimating) {
  //     return;
  //   }
  //   const { item, target } = evt;
  //   const {
  //     attrs: { isTitleShape },
  //   } = target;
  //   const model = item.getModel();
  //   const { id } = model;
  //   if (isTitleShape) {
  //     removeTooltip(id);
  //   }
  // });
};
