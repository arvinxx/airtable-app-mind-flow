import { useEffect, useState } from 'react';
import G6, { TreeGraph } from '@antv/g6';
import { GraphOptions } from '@antv/g6/lib/types';
import { defaultConfig } from '../config';
import { registerShapes } from '../shapes';
import { transformData } from '../../../utils';
import { useStore } from '../../../models';

let firstRender = true;
export const useTreeGraph = (config: Partial<GraphOptions>) => {
  const { settings } = useStore();
  const [treeGraph, setTreeGraph] = useState<TreeGraph>(null);

  const { container, width, height } = config;

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
  }, [container]);

  // 当长宽高变化时,更新尺寸
  useEffect(() => {
    if (!treeGraph) return;
    const prevWidth = treeGraph.getWidth();
    const prevHeight = treeGraph.getHeight();

    treeGraph.changeSize(width, height);

    // 当窗口变化时,始终将当前视窗的位置置中
    treeGraph.translate((width - prevWidth) / 2, (height - prevHeight) / 2);
  }, [width, height]);

  // 当 treeGraph 更新时,重新渲染图
  useEffect(() => {
    if (!treeGraph) return;
    let zoomRatio;
    let lastPoint;

    if (!firstRender) {
      // 获取缩放倍数
      zoomRatio = treeGraph.getZoom();
      //在拉取新数据重新渲染页面之前先获取点（0， 0）在画布上的位置
      lastPoint = treeGraph.getCanvasByPoint(0, 0);
    }

    // 更新数据
    transformData(settings).then((data) => {
      treeGraph.data(data);
      treeGraph.render();

      if (!firstRender) {
        // 进行缩放
        treeGraph.zoomTo(zoomRatio);

        //获取重新渲染之后点（0， 0）在画布的位置
        const newPoint = treeGraph.getCanvasByPoint(0, 0);
        treeGraph.translate(lastPoint.x - newPoint.x, lastPoint.y - newPoint.y);
      } else {
        firstRender = false;
      }
    });
  }, [treeGraph, settings]);

  return treeGraph;
};
