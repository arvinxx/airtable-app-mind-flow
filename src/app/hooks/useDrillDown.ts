import { useEffect } from 'react';

import { TreeGraph } from '@antv/g6';
import { Item } from '@antv/g6/lib/types';
import { useLocalDrillDown } from '../../models';
import { getDrillDownNodeChain } from '../../utils';

/**
 * 下钻方法
 * @param treeGraph 需要传入的 TreeGraph 对象
 */
export const useDrillDown = (treeGraph: TreeGraph | undefined) => {
  const { activeDrillDown } = useLocalDrillDown();

  useEffect(() => {
    if (!treeGraph) return;

    const contextmenu = (event: { item: Item; target: Item }) => {
      const { item, target } = event;
      console.log(event);

      // 顺序翻转 把根节点放最前面
      // const drillDownList = getDrillDownNodeChain(treeGraph, item);
      //
      // console.log(drillDownList);
      // 激活下钻功能
      // activeDrillDown(id, drillDownList);
    };

    treeGraph.on('afteritemstatechange', contextmenu);
    return () => {
      treeGraph.off('afteritemstatechange');
    };
  }, [treeGraph]);
};
