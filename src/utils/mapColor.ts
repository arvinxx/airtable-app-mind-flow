import { mindFlowColors } from '../themes/color';

export const getHexFromColor = (color: string) => {
  if (!color) return mindFlowColors.white;

  if (color.includes('blue')) return mindFlowColors.blue;
  if (color.includes('cyan')) return mindFlowColors.blue;

  if (color.includes('teal')) return mindFlowColors.cyan;

  if (color.includes('green')) return mindFlowColors.green;

  if (color.includes('yellow')) return mindFlowColors.yellow;

  if (color.includes('purple')) return mindFlowColors.purple;

  if (color.includes('pink')) return mindFlowColors.red;
  if (color.includes('red')) return mindFlowColors.red;
  if (color.includes('orange')) return mindFlowColors.red;

  if (color.includes('gray')) return mindFlowColors.gray;
};
