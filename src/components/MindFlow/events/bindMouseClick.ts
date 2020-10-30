import { props } from '../data';
import {
  getExpandPosition,
  getPosition,
  sleep,
  updateCollapseStatus,
  bindMouseEvent,
} from '../utils';
import { Graph } from '@antv/g6';

export let backUpData = null;

// 事件绑定
export const bindMouseClick = (graph: Graph) => {
  let isAnimating = false;
  bindMouseEvent(graph, 'node', {
    event: 'click',
    callbackFn: async (evt: any) => {
      if (isAnimating) return;

      const { item, target } = evt;

      const {
        attrs: { isCollapseShape },
      } = target;

      if (isCollapseShape) {
        isAnimating = true;

        const model = item.getModel();
        graph.setItemState(item, 'click', true);
        const { childrenKeys, id, collapsed, recordIndex } = model;
        // 更新状态
        if (collapsed) {
          updateCollapseStatus(id, recordIndex, collapsed, 'expand');
          graph.changeData(getExpandPosition(backUpData));
          graph.stopAnimate();

          childrenKeys.forEach((key: string) => {
            const childrenItem = graph.findById(key);
            if (childrenItem) {
              childrenItem.toBack();
            }
          });

          updateCollapseStatus(id, recordIndex, collapsed);
          graph.changeData(getPosition(backUpData));
          await sleep(500);
          graph.setItemState(item, 'click', true);

          isAnimating = false;
        } else {
          updateCollapseStatus(id, recordIndex, collapsed, 'collapsed');
          graph.changeData(getPosition(backUpData));
          childrenKeys.forEach((key: string) => {
            const childrenItem = graph.findById(key);
            if (childrenItem) {
              childrenItem.toBack();
            }
          });
          await sleep(500);
          updateCollapseStatus(id, recordIndex, collapsed);
          childrenKeys.forEach((key: string) => {
            const childrenItem = graph.findById(key);
            if (childrenItem) {
              graph.remove(childrenItem);
            }
          });
          graph.setItemState(item, 'click', true);
          isAnimating = false;
        }
      } else {
        const { nodeClick } = props;
        if (typeof nodeClick === 'function') {
          nodeClick(item.getModel());
        }
      }
    },
  });
};
