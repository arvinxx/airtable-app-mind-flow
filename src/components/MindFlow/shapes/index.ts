import flowRect from './flowRect';
import flowCubic from './flowCubic';
import G6 from '@antv/g6';

export const shapes = [flowRect, flowCubic];

export const registerShapes = () => {
  shapes.forEach((shape) => {
    switch (shape.type) {
      case 'edge':
        G6.registerEdge(shape.name, shape.definition, shape.extendShapeType);
        break;
      case 'node':
        G6.registerNode(shape.name, shape.definition, shape.extendShapeType);
    }
  });
};
