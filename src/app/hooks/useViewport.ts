import { useEffect, useState } from 'react';
import G6, { TreeGraph } from '@antv/g6';

import { useSettingsStore } from '../../models';

export const useViewPort = (treeGraph: TreeGraph) => {
  const { settings, isValid } = useSettingsStore();

  // 当 treeGraph 更新时,重新渲染图
  useEffect(() => {
    if (!treeGraph || !isValid) return;
    let zoomRatio = treeGraph.getZoom();
  }, [treeGraph, settings]);

  return treeGraph;
};
