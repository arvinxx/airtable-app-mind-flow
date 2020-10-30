import G6 from '@antv/g6';
import { useEffect } from 'react';

export const useRenderGraph = (container: string | HTMLElement, data) => {
  useEffect(() => {
    const chart = new G6.Graph({
      container: container, // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
      width: 800, // Number，必须，图的宽度
      height: 500, // Number，必须，图的高度
    });

    chart.data(data); // 读取 Step 2 中的数据源到图上
    chart.render(); // 渲染图;
  });
};
