import React, { FC, useRef } from 'react';
import { Box, colors } from '@airtable/blocks/ui';
import { loadCSSFromString } from '@airtable/blocks/ui';

import { useTreeGraph, useOpenExpandPanel } from './hooks';
import { globalStyle } from '../globalStyle';

interface MindFlowProps {
  width: number;
  height: number;
}

loadCSSFromString(globalStyle);

const MindFlow: FC<MindFlowProps> = ({ height, width }) => {
  const ref = useRef<HTMLDivElement>(null);

  const treeGraph = useTreeGraph({
    container: ref.current,
    width,
    height: height,
  });

  // console.log('MindFlow/treeGraph:', treeGraph);
  useOpenExpandPanel(treeGraph);

  return <Box ref={ref} position={'relative'} />;
};

export default MindFlow;
