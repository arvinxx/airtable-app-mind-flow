import React, { FC, useEffect, useRef, useState } from 'react';
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
  const f = useFormatMessage();
  const ref = useRef<HTMLDivElement>();
  const [container, setContainer] = useState<HTMLDivElement>();
  const { isValid } = useStore();

  useEffect(() => {
    setContainer(ref.current);
  }, [isValid]);

  const treeGraph = useTreeGraph({
    container,
    width,
    height: height,
  });

  useOpenExpandPanel(treeGraph);
  useCollapsedNode(treeGraph);
  useHover(treeGraph);

  return isValid ? (
    <Box ref={ref} position={'relative'} />
  ) : (
    <Box
      flex={1}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      height={'100vh'}
    >
      {f('empty.state')}
    </Box>
  );
};

export default MindFlow;
