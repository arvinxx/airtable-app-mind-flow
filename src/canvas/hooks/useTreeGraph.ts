import { useEffect, useState } from 'react';
import { TreeGraph } from '@antv/g6';
import { Graph } from '@antv/x6';
import { Options } from '@antv/x6/lib/graph/options';

import { defaultConfig } from '../config';
import { registerShapes } from '../shapes';
import { transformData } from '../../utils';
import { useLocalStore, useSettingsStore } from '../../models';

let firstRender = true;
let defaultZoomRatio: number;
export const useTreeGraph = (config: Partial<Options.Manual>) => {
  const { settings, isValid } = useSettingsStore();
  const { isDrillDown, drillDownId } = useLocalStore();
  const [treeGraph, setTreeGraph] = useState<Graph>(null);

  const { container, width, height } = config;

  // 当配置变更时,自动更新 treeGraph
  useEffect(() => {
    // 没有 container 或者无效的时候 都不更新
    if (!container || !isValid) return;

    // 如果没有初始化 那么注册图形
    if (!treeGraph) {
      registerShapes();
    }

    setTreeGraph(
      new Graph({
        container,
        ...defaultConfig,
        ...config,
      })
    );
  }, [container, isValid]);

  // 当长宽高变化时,更新尺寸
  useEffect(() => {
    if (!treeGraph) return;
    const prevWidth = treeGraph?.getWidth();
    const prevHeight = treeGraph?.getHeight();

    treeGraph.resize(width, height);

    // 当窗口变化时,始终将当前视窗的位置置中
    treeGraph.translate((width - prevWidth) / 2, (height - prevHeight) / 2);
    // 如果是第一次刷新出页面时(即缩放倍数是默认值)
    // 这个时候进行尺寸变化时,将图形尺寸自适应视图
    if (treeGraph.zoom() === defaultZoomRatio) {
      treeGraph.fitView();
    }
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
    transformData(settings, isDrillDown ? drillDownId : null).then((data) => {
      if (!data) return;
      treeGraph.data(data);
      treeGraph.render();

      if (!firstRender && lastPoint) {
        // 进行缩放
        treeGraph.zoomTo(zoomRatio);
        //获取重新渲染之后点（0， 0）在画布的位置
        const newPoint = treeGraph.getCanvasByPoint(0, 0);
        treeGraph.translate(lastPoint.x - newPoint.x, lastPoint.y - newPoint.y);
      } else {
        firstRender = false;
        defaultZoomRatio = treeGraph.getZoom();
      }
    });
  }, [treeGraph, settings]);

  return treeGraph;
};
