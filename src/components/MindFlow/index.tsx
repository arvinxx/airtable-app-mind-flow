import React, { FC, useEffect, useRef } from 'react';
import G6 from '@antv/g6';

import { useStore } from '../../models';
import { transformData } from '../../utils';
import { registerShapes } from './shapes';
import { defaultConfig } from './config';

registerShapes();
interface MindFlowProps {
  width: number;
  height: number;
}
const MindFlow: FC<MindFlowProps> = ({ height, width }) => {
  const ref = useRef<HTMLDivElement>(null);
  let graph;
  const { settings } = useStore();

  const renderGraph = async () => {
    if (!graph) {
      graph = new G6.TreeGraph({
        container: ref.current,
        ...defaultConfig,
        height,
        width,
      });
    }
    const data = await transformData(settings);

    graph.data(data);
    graph.render();
  };
  useEffect(() => {
    renderGraph().finally();
  });

  return (
    <div>
      <div ref={ref} />
    </div>
  );
};

export default MindFlow;
