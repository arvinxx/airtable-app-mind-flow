import { Graph } from '@antv/g6';

type EventType =
  | 'click'
  | 'dblclick'
  | 'mouseenter'
  | 'mousemove'
  | 'mouseout'
  | 'mouseover'
  | 'mouseleave'
  | 'mousedown'
  | 'mouseup'
  | 'contextmenu'
  | 'dragstart'
  | 'drag'
  | 'dragend'
  | 'dragenter'
  | 'dragleave'
  | 'drop'
  | 'keydown'
  | 'keyup'
  | 'wheel'
  | 'touchstart'
  | 'touchmove'
  | 'touchend';

interface EventBinding {
  /**
   * 触发事件
   */
  event: EventType;
  /**
   * 回调方法
   */
  callbackFn: Function;
}
/**
 * 绑定事件
 * @param graph
 * @param target
 * @param evt
 * @param callbackFn
 */
export const bindMouseEvent = (
  graph: Graph,
  target: string,
  { event, callbackFn }: EventBinding
) => {
  graph.on(`${target}:${event}`, callbackFn);
};
