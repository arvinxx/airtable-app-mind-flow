import { useEffect } from 'react';
import G6, { Graph } from '@antv/g6';
import { getPosition } from '../utils';
import { defaultConfig } from '../config';
import { initEvent } from '../events';
import { registerShapes } from '../shapes';

registerShapes();

export const useInitGraph = (container, data) => {
  let graph: Graph = null;

  useEffect(() => {
    // 没有 dom 节点的时候不渲染
    if (!container) return;

    if (!graph) {
      graph = new G6.Graph({
        container,
        ...defaultConfig,
      });
    }

    // 初始化事件
    initEvent(graph);

    graph.data(getPosition(data, true));

    graph.render();
    graph.zoom(1);

    if (data?.length) {
      graph.changeData(getPosition(JSON.parse(JSON.stringify(data))));
    }
  }, []);

  return graph;
};
