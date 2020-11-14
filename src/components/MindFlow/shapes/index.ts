import G6 from '@antv/g6';
import flowRect from './flowRect';
import flowCubic from './flowCubic';
// import mindNode from './mindNode';

export const shapes = [
  flowRect,
  // mindNode
  flowCubic,
];

export const registerShapes = () => {
  shapes.forEach((shape) => {
    switch (shape.type) {
      case 'edge':
        if ('definition' in shape && typeof shape.definition !== 'string') {
          G6.registerEdge(shape.name, shape.definition, shape.extendShapeType);
        }
        break;
      case 'node':
        if ('jsx' in shape && shape.jsx) {
          G6.registerNode(shape.name, shape.jsx, shape.extendShapeType);
        } else {
          if ('definition' in shape) {
            G6.registerNode(
              shape.name,
              shape.definition,
              shape.extendShapeType
            );
          }
        }
    }
  });
};
