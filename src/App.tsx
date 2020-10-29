import React, { FC } from 'react';
import { useShowSettings } from './models';
import { Settings } from './components';

const App: FC = () => {
  const { isShowSettings } = useShowSettings();

  return (
    <div>
      <div>hello world!</div>
      {isShowSettings && <Settings />}
    </div>
  );
};

export default App;
