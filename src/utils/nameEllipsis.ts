import G6 from '@antv/g6';

export const nameEllipsis = (name, maxWidth = 16, fontSize = 14) => {
  let str: string = name;
  let textWidth = G6.Util.getTextSize(str, 12)[0];
  while (textWidth > maxWidth) {
    str = str.substr(0, str.length - 1);
    textWidth = G6.Util.getTextSize(str + '...', fontSize)[0];
  }
  return str === name ? name : str + '...';
  // return name.length >= maxLength ? name.substr(0, maxLength) + '...' : name;
};
