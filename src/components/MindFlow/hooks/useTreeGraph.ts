import { useEffect, useState } from 'react';
import G6, { TreeGraph } from '@antv/g6';
import { GraphOptions } from '@antv/g6/lib/types';
import { defaultConfig } from '../config';
import { registerShapes } from '../shapes';
import { transformData } from '../../../utils';
import { useStore } from '../../../models';

export const useTreeGraph = (config: Partial<GraphOptions>) => {
  const { settings } = useStore();
  const [treeGraph, setTreeGraph] = useState<TreeGraph>(null);

  const { container } = config;

  // 当配置变更时,自动更新 treeGraph
  useEffect(() => {
    if (!container) return;
    // 如果没有初始化 那么注册图形
    if (!treeGraph) {
      registerShapes();
    }
    setTreeGraph(
      new G6.TreeGraph({
        container,
        ...defaultConfig,
        ...config,
      })
    );
  }, [container, config.width, config.height]);

  // 当 treeGraph 更新时,重新渲染图
  useEffect(() => {
    if (!treeGraph) return;

    transformData(settings).then((data) => {
      treeGraph.data(data);
      treeGraph.render();
    });
  }, [treeGraph, settings]);

  return treeGraph;
};
