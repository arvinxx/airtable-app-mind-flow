import React, { FC, useEffect, useRef } from 'react';
import { Box, colors } from '@airtable/blocks/ui';
import { Settings, MindFlow } from './components';
import { useStore, useShowSettings } from './models';
import { loadCSS } from './globalStyle';
import { useSize } from 'ahooks';

loadCSS();

const App: FC = () => {
  const { isShowSettings, setShowSettings } = useShowSettings();
  const { settings, isValid } = useStore();
  const graph = useRef(null);
  const canvas = useRef(null);

  const size = useSize(canvas);
  useEffect(() => {
    if (!isValid && !isShowSettings) {
      setShowSettings(true);
    }
  }, [setShowSettings, isValid, isShowSettings]);

  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      display="flex"
      backgroundColor="#f5f5f5"
      overflow="hidden"
    >
      {isValid ? (
        <Box
          ref={canvas}
          style={{
            width: isShowSettings ? 'calc(100% - 300px)' : '100%',
          }}
        >
          <MindFlow width={size.width} height={size.height} />
        </Box>
      ) : (
        <Box flex={1}>123</Box>
      )}

      {/*<FlowGraph graph={graph} />*/}
      {isShowSettings && (
        <Settings graph={graph} settings={settings} isValid={isValid} />
      )}
    </Box>
  );
};

export default App;
