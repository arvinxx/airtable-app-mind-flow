import { ShapeDefine, ShapeOptions } from '@antv/g6/lib/interface/shape';

interface AbstractShapeDefinition {
  type: string;
  name: string;
  definition: ShapeOptions | ShapeDefine;
  extendShapeType?: string;
}

export interface NodeRegisterDefinition extends AbstractShapeDefinition {
  type: 'node';
  definition: ShapeOptions | ShapeDefine;
}

export interface EdgeRegisterDefinition extends AbstractShapeDefinition {
  type: 'edge';
  definition: ShapeOptions;
}

export type ShapeRegisterDefinition =
  | NodeRegisterDefinition
  | EdgeRegisterDefinition;
