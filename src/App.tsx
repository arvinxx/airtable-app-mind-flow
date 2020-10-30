import React, { FC, useEffect, useRef } from 'react';
import { Box } from '@airtable/blocks/ui';
import { Settings, MindFlow } from './components';
import { useSettings, useShowSettings } from './models';
import { loadCSS } from './globalStyle';

loadCSS();

const App: FC = () => {
  const { isShowSettings, setShowSettings } = useShowSettings();
  const settings = useSettings();
  const graph = useRef(null);

  useEffect(() => {
    if (!settings.isValid) {
      setShowSettings(true);
    }
  }, [setShowSettings, settings.isValid]);

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
      <Box ref={graph}>{/*<MindFlow />*/}123</Box>
      {/*<FlowGraph graph={graph} />*/}
      {isShowSettings && (
        <Settings graph={graph} settingsValidationResult={settings} />
      )}
    </Box>
  );
};

export default App;
