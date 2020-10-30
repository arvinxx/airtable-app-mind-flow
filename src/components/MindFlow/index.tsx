import React from 'react';
import { data } from './data';

const MindFlow = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  // transformData(data);

  // useInitGraph(ref.current, data);

  return (
    <div>
      <div ref={ref} />
    </div>
  );
};

export default MindFlow;
