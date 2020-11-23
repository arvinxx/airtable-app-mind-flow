import { mindFlowColors } from '../themes/color';
import { colors, colorUtils } from '@airtable/blocks/ui';

export const tooltip = `
.minimap{
  border: 1px solid ${mindFlowColors.black009};
  border-radius: 2px;
  position: absolute;
  left: 0;
  bottom: 0;
  background: white;
  opacity:0.7
}

.g6-tooltip {
  border-radius: 4px;
  font-size: 12px;
  color: #545454;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 12px 16px;
  width: 330px;
  box-shadow: ${mindFlowColors.black009} 0px 4px 8px;
}
.g6-tooltip-title {
  font-size: 14px;
  color:rgba(0,0,0,0.65);
  font-weight: bold;
}
.g6-tooltip-description {
  margin-top: 8px;
  color:rgba(0,0,0,0.65);
  font-size: 12px;
  overflow-y: scroll;
  max-height: 200px;
  border-top: solid 1px ${mindFlowColors.black009};
}
.g6-tooltip-description pre{
  background: #f1f1f1;
  padding: 8px;
  overflow: scroll;
}

.g6-tooltip-information {
  margin: 16px 0 8px;
  color:rgba(0,0,0,0.65);
  font-size: 12px;
  font-weight: bold;
  padding-top:8px;
  border-top: solid 1px ${mindFlowColors.black009};
}
.g6-tooltip-info-item {
  color:rgba(0,0,0,0.45);
  font-size: 12px;
  margin-left: 4px;
  margin-bottom: 4px;
}
`;

export const contextMenu = `
  .g6-component-contextmenu {
    width:120px;
    position: absolute;
    list-style-type: none;
    padding: 4px 0;
    left: -150px;
    background-color: ${mindFlowColors.white};
    border-radius: 2px;
    font-size: 14px;
    color: #545454;
    box-shadow: ${mindFlowColors.black009} 0px 4px 8px;
  }
  .g6-component-contextmenu .divider {
    width:100%;
    height:1px;
    display:block;
    margin:2px 0;
    background-color: ${mindFlowColors.black009};
  }
  .g6-component-contextmenu ul{
    padding: 0;
    margin: 0;
  }
  .g6-component-contextmenu li {
    cursor: pointer;
    padding: 8px 16px;
    list-style-type:none;
    list-style: none;
    margin-left: 0px;
  }
  
  .g6-component-contextmenu li:hover {
    color: ${colorUtils.getHexForColor(colors.BLUE_BRIGHT)};
    background-color: ${mindFlowColors.menuHoverBg};
  }
`;
