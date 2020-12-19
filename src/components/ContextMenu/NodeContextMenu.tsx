import React from 'react';
import { Box, loadCSSFromString, Icon, colors } from '@airtable/blocks/ui';
import { contextMenu } from './style';
import { useLocalViewPort } from '../../models';

loadCSSFromString(contextMenu);

const NodeContextMenu = ({ x = -300, y = 0 }) => {
  const { zoomRatio } = useLocalViewPort();
  console.log(zoomRatio, x, x + 120 * zoomRatio, x + 120 / zoomRatio);
  return (
    <Box
      style={{
        width: 256,
        position: 'absolute',
        left: x + 120 / zoomRatio,
        top: y + 20 / zoomRatio,
      }}
      className="g6-component-node-contextmenu"
    >
      <div>
        <ul>
          <li>下钻</li>
        </ul>
        <span className="divider" />
        <ul>
          <li>移除节点</li>
          <li>删除记录</li>
        </ul>
      </div>
    </Box>
  );
};

export default NodeContextMenu;
