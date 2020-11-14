import G6 from '@antv/g6';
import node from './node';
import flowLine from './flowLine';
// import mindNode from './mindNode';

export const shapes = [
  node,
  // mindNode,
  flowLine,
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
