import React, { useEffect, useState } from 'react';
import { TreeGraph } from '@antv/g6';

export const useNodeContextMenu = (treeGraph: TreeGraph) => {
  // 节点ContextMenu坐标
  const [visible, setVisible] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    if (!treeGraph) return;
    // 监听节点上面右键菜单事件
    treeGraph.on('node:contextmenu', (evt) => {
      const { item } = evt;
      const model = item.getModel();
      const { x, y } = model;
      const point = treeGraph.getCanvasByPoint(x, y);
      setX(point.x);
      setY(point.y);
      setVisible(true);
    });
    return () => {
      treeGraph.off('node:contextmenu');
    };
  }, [treeGraph]);

  return { visible, x, y };
};
