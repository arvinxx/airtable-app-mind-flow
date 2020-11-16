import { useEffect } from 'react';
import { TreeGraph } from '@antv/g6';

/**
 * 点击对象打开操作面板的 hooks
 * @param treeGraph 需要传入的 TreeGraph 对象
 */
export const useCollapsedNode = (treeGraph: TreeGraph | undefined) => {
  useEffect(() => {
    if (!treeGraph) return;

    const collapsedNode = (event: any) => {
      const { target, item } = event;

      if (target.get('name') === 'collapse-icon') {
        const collapsed = !item.getModel().collapsed;
        item.getModel().collapsed = collapsed;
        treeGraph.setItemState(item, 'collapsed', collapsed);
        treeGraph.layout();
      }
    };

    treeGraph.on('node:click', collapsedNode);
  }, [treeGraph]);
};
