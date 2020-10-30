import { useEffect } from 'react';
import G6 from '@antv/g6';
import { defaultConfig } from '../config';
import { registerShapes } from '../shapes';

registerShapes();

export const useRenderGraph = (graph, container, data) => {
  useEffect(() => {
    if (!container) return;

    if (!graph) {
      graph = new G6.Graph({
        container,
        ...defaultConfig,
        width: 1200,
        height: 800,
      });
    }
    graph.data(data);
    graph.render();
  }, []);
};
