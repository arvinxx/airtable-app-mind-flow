import { useEffect } from 'react';

import { TreeGraph } from '@antv/g6';
import { Item } from '@antv/g6/lib/types';
import { useLocalStore } from '../../../models';

/**
 * 下钻方法
 * @param treeGraph 需要传入的 TreeGraph 对象
 */
export const useDrillDown = (treeGraph: TreeGraph | undefined) => {
  const { activeDrillDown } = useLocalStore();

  useEffect(() => {
    if (!treeGraph) return;

    const hover = (event: { item: Item; target: Item }) => {
      const { item, target } = event;

      if (target.get('name') === 'background') {
        item.setState('drillDown', true);
      }

      const id = item.getModel()?.id;
      const name = item.getModel().name;

      const newDepth = item.getModel().depth;
      // 必须存在才行
      if (!id) return;

      const nodeChain = [];
      nodeChain.push({ id, name });

      // 定义爹 id
      let parentId = item.getModel()?.parent as string;

      for (let i = 0; i < newDepth; i++) {
        if (parentId) {
          const parentNode = treeGraph.findById(parentId).getModel();

          nodeChain.push({
            id: parentId,
            name: parentNode.name as string,
          });
          // 推入之后再查一次爹的爹 id
          parentId = parentNode.parent as string;
        }
      }

      // 顺序翻转 把根节点放最前面
      const drillDownList = nodeChain.reverse();

      activeDrillDown(id, drillDownList);
    };

    const leave = (event: { item: Item; target }) => {
      const { item } = event;
      item.setState('drillDown', false);
    };

    treeGraph.on('node:mouseenter', hover);
    treeGraph.on('node:mouseleave', leave);
    return () => {
      treeGraph.off('node:mouseenter');
      treeGraph.off('node:mouseleave');
    };
  }, [treeGraph]);
};
