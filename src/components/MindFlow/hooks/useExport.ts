import { exportToPng, exportToSvg, ExportType } from '../../../utils';

// const onExportGraph = (exportType: ExportType) => {
//   const { view } = settings;
//   // 没有视图就结束
//   if (!(view && graph.current)) return;
//
//   // 没有对象也结束
//   const element = graph.current.firstElementChild;
//   if (!element) return;
//
//   const name = view.name;
//
//   if (exportType === ExportType.PNG) {
//     exportToPng(element, name);
//   } else if (exportType === ExportType.SVG) {
//     exportToSvg(element, name);
//   } else {
//     throw new Error(`Unexpected export type: ${exportType}`);
//   }
// };
