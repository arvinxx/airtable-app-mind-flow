import React, { FC, useEffect, useRef, useState } from 'react';
import { Box, loadCSSFromString, Icon, colors } from '@airtable/blocks/ui';

import {
  useTreeGraph,
  useOpenExpandPanel,
  useCollapsedNode,
  useHover,
  useDrillDown,
} from './hooks';
import { globalStyle } from './globalStyle';
import {
  useSettingsStore,
  useFormatMessage,
  useLocalStore,
} from '../models';

loadCSSFromString(globalStyle);

interface MindFlowProps {
  width: number;
  height: number;
}

const MindFlow: FC<MindFlowProps> = ({ height, width }) => {
  const f = useFormatMessage();
  const ref = useRef<HTMLDivElement>();
  const [container, setContainer] = useState<HTMLDivElement>();
  const { isValid } = useSettingsStore();

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
  useDrillDown(treeGraph);

  const {
    setDrillDownNode,
    deActiveDrillDown,
    isDrillDown,
    recordChain,
  } = useLocalStore();

  return (
    <Box>
      {/* 下钻示意组件 */}
      {isDrillDown ? (
        <Box
          zIndex={99999}
          position={'absolute'}
          left={'230px'}
          padding={'4px'}
          style={{ backdropFilter: 'blur(2px)' }}
        >
          <Box display={'flex'} alignItems={'center'}>
            {recordChain.map((record, index) => {
              const isLastRecord = index + 1 === recordChain.length;
              return (
                <Box key={record.id} display={'flex'} alignItems={'center'}>
                  <Box
                    backgroundColor={
                      isLastRecord ? colors.BLUE_BRIGHT : 'white'
                    }
                    padding={2}
                    style={{
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      cursor: 'pointer',
                    }}
                    maxWidth={'200px'}
                    borderRadius={2}
                    boxShadow={'0 2px 4px rgba(0,0,0,0.09)'}
                    textColor={isLastRecord ? 'white' : '#737373'}
                    onClick={() => {
                      if (index === 0) {
                        deActiveDrillDown();
                      }
                      setDrillDownNode(record.id);
                    }}
                  >
                    {record.name}
                  </Box>

                  {isLastRecord ? null : (
                    <Box
                      display={'flex'}
                      alignItems={'center'}
                      marginLeft={1}
                      marginRight={1}
                    >
                      <Icon
                        name="chevronRight"
                        size={16}
                        fillColor={'#999999'}
                      />
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
      ) : null}
      {isValid ? (
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
      )}
    </Box>
  );
};

export default MindFlow;
