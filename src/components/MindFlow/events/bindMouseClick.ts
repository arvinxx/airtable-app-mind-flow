import {
  // getExpandPosition,
  // getPosition,
  // sleep,
  // updateCollapseStatus,
  bindMouseEvent,
} from './utils';
import { Graph } from '@antv/g6';

export let backUpData = null;

// 事件绑定
export const bindMouseClick = (graph: Graph) => {
  let isAnimating = false;
  bindMouseEvent(graph, 'node', {
    event: 'click',
    callbackFn: async (evt: any) => {
      if (isAnimating) return;
    },
  });
};
