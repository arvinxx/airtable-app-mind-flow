import { saveSvgAsPng, svgAsDataUri } from 'save-svg-as-png';

export enum ExportType {
  PNG = 'png',
  SVG = 'svg',
}

/**
 * 导出为 Png
 * @param element
 * @param name
 */
export const exportToPng = (element: Element, name: string) => {
  saveSvgAsPng(element, `${name}.png`, {
    scale: 2.0,
  });
};

/**
 * 导出为 Svg
 * @param element
 * @param name
 */
export const exportToSvg = (element: Element, name) => {
  // Convert the SVG to a data URI and download it via an anchor link.
  svgAsDataUri(element, {}, (uri) => {
    const downloadLink = document.createElement('a');
    downloadLink.download = `${name}.svg`;
    downloadLink.href = uri;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  });
};
