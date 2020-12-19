import { mindFlowColors } from '../../themes/color';
import { colors, colorUtils } from '@airtable/blocks/ui';

export const contextMenu = `
  .g6-component-node-contextmenu {
    position: absolute;
    list-style-type: none;
    padding: 4px 0;
    left: -150px;
    background-color: ${mindFlowColors.white};
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    font-size: 14px;
    color: #545454;
    box-shadow: ${mindFlowColors.black009} 0px 4px 8px;
  }
  .g6-component-node-contextmenu .divider {
    width:100%;
    height:1px;
    display:block;
    margin:2px 0;
    background-color: ${mindFlowColors.black009};
  }
  .g6-component-node-contextmenu ul{
    padding: 0;
    margin: 0;
  }
  .g6-component-node-contextmenu li {
    cursor: pointer;
    padding: 8px 16px;
    list-style-type:none;
    list-style: none;
    margin-left: 0px;
  }
  
  .g6-component-node-contextmenu li:hover {
    color: ${colorUtils.getHexForColor(colors.BLUE_BRIGHT)};
    background-color: ${mindFlowColors.menuHoverBg};
  }
`;
