import React, { FC, useRef } from 'react';
import { Box, loadCSSFromString } from '@airtable/blocks/ui';

import {
  useTreeGraph,
  useOpenExpandPanel,
  useCollapsedNode,
  useHover,
} from './hooks';
import { globalStyle } from '../globalStyle';
import { useStore, useFormatMessage } from '../../models';

loadCSSFromString(globalStyle);

interface MindFlowProps {
  width: number;
  height: number;
}

const MindFlow: FC<MindFlowProps> = ({ height, width }) => {
  const ref = useRef<HTMLDivElement>();
  const { isValid } = useStore();
  const f = useFormatMessage();

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
          {f('empty.state')}
        </Box>
      )}
    </Box>
  );
};

export default MindFlow;
