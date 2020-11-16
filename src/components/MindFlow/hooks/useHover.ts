import { useEffect } from 'react';
import { TreeGraph } from '@antv/g6';
import { Item } from '@antv/g6/lib/types';
import { IElement } from '@antv/g-base/lib';
import { mindFlowColors } from '../../../themes/color';

/**
 * 点击对象打开操作面板的 hooks
 * @param treeGraph 需要传入的 TreeGraph 对象
 */
export const useHover = (treeGraph: TreeGraph | undefined) => {
  useEffect(() => {
    if (!treeGraph) return;

    const hover = (event: { item: Item; target }) => {
      const { item, target } = event;
      if (target.get('name') === 'collapse-icon') {
        item.setState('hovered', 'collapse-icon');
      }
      if (target.get('name') === 'background') {
        item.setState('hovered', 'background');
      }
    };

    const leave = (event: { item: Item; target }) => {
      const { item } = event;
      item.setState('hovered', false);
    };

    treeGraph.on('node:mouseover', hover);
    // treeGraph.on('node:mouseover', hover);
    treeGraph.on('node:mouseleave', leave);
    return () => {
      treeGraph.off('node:mouseover');
      treeGraph.off('node:mouseleave');
    };
  }, [treeGraph]);
};

export const handleHover = (event: string, value, item?: Item) => {
  if (event === 'hovered') {
    const isBackground = value === 'background';
    const background: IElement = item
      .get('group')
      .find((e) => e.get('name') === 'background');
    background.animate(
      { opacity: isBackground ? 0.2 : 0.1 },
      { duration: 100 }
    );

    const isMarker = value === 'collapse-icon';
    const marker: IElement = item
      .get('group')
      .find((e) => e.get('name') === 'collapse-icon');
    // node.set('hovered', value);
    if (marker) {
      const { color } = item.getModel();
      marker?.animate(
        {
          fill: isMarker ? mindFlowColors[color] : '#fff',
          stroke: isMarker ? '#fff' : mindFlowColors[color],
          // r: isMarker ? 10 : 8,
        },
        { duration: 100 }
      );
    }
  }
};
