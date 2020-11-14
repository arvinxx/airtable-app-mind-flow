import { ShapeDefine, ShapeOptions } from '@antv/g6/lib/interface/shape';
import { ModelConfig } from '@antv/g6/es/types';

interface AbstractShapeDefinition {
  type: string;
  name: string;
  definition: ShapeOptions | ShapeDefine;
  extendShapeType?: string;
}

export interface NodeRegisterDefinition extends AbstractShapeDefinition {
  definition: ShapeOptions | ShapeDefine;
}
export interface NodeRegisterJSX
  extends Omit<AbstractShapeDefinition, 'definition'> {
  type: 'node';
  /**
   * 使用 jsx 的方式定义节点
   */
  jsx?: (config: ModelConfig) => string;
  definition?: any;
  extendShapeType?: string;
}

export interface EdgeRegisterDefinition extends AbstractShapeDefinition {
  type: 'edge';
  definition: ShapeOptions;
}

export type ShapeRegisterDefinition =
  | NodeRegisterDefinition
  | NodeRegisterJSX
  | EdgeRegisterDefinition;
