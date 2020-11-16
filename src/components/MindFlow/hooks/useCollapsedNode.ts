import { useEffect } from 'react';
import G6, { TreeGraph } from '@antv/g6';
import { Item } from '@antv/g6/lib/types';

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
    return () => {
      treeGraph.off('node:click');
    };
  }, [treeGraph]);
};

/**
 * 根据事件状态值修改折叠按钮
 * @param event
 * @param value
 * @param item
 */
export const handleCollapsedIcon = (
  event: string,
  value: boolean | string,
  item: Item
) => {
  if (event === 'collapsed') {
    const marker = item
      .get('group')
      .find((ele) => ele.get('name') === 'collapse-icon');
    const icon = value ? G6.Marker.expand : G6.Marker.collapse;
    marker.attr('symbol', icon);
  }
};
