import React, { FC, useRef } from 'react';
import { Box, loadCSSFromString } from '@airtable/blocks/ui';

import {
  useTreeGraph,
  useOpenExpandPanel,
  useCollapsedNode,
  useHover,
} from './hooks';
import { globalStyle } from '../globalStyle';
import { useStore } from '../../models';

loadCSSFromString(globalStyle);

interface MindFlowProps {
  width: number;
  height: number;
}

const MindFlow: FC<MindFlowProps> = ({ height, width }) => {
  const ref = useRef<HTMLDivElement>();
  const { isValid } = useStore();

  const treeGraph = useTreeGraph({
    container: ref.current,
    width,
    height: height,
  });

  useOpenExpandPanel(treeGraph);
  useCollapsedNode(treeGraph);
  useHover(treeGraph);

  return (
    <Box ref={ref} position={'relative'}>
      {isValid ? null : (
        <Box
          flex={1}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          height={'100vh'}
        >
          请在右侧完成表格配置
        </Box>
      )}
    </Box>
  );
};

export default MindFlow;
