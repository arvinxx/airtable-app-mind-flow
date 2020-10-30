import { Graph } from '@antv/g6';
import { bindMouseEvent } from './utils';

/**
 * node hover 状态
 */
export const nodeHoverState = (graph: Graph) => {
  const setHoverState = (node, value: boolean) => {
    graph.setItemState(node, 'hover', value);
  };

  const updateStyle = (node, style) => {
    graph.updateItem(node, {
      style: {
        ...node._cfg.originStyle,
        ...style,
      },
    });
  };

  bindMouseEvent(graph, 'node', {
    event: 'mouseenter',
    callbackFn: (evt: any) => {
      const node = evt.item;
      // 给节点状态添加 hover
      setHoverState(node, true);

      // 更新 hover 样式
      updateStyle(node, {
        shadowColor: '#bbb',
        shadowBlur: 6,
      });
    },
  });

  bindMouseEvent(graph, 'node', {
    event: 'mouseleave',
    callbackFn: (evt: any) => {
      const node = evt.item;

      setHoverState(node, false);

      // 更新 hover 样式
      updateStyle(node, {
        shadowColor: 'transparent',
        shadowBlur: 0,
      });
    },
  });
};
