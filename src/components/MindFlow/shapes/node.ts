import { ModelConfig } from '@antv/g6/es/types';
import { ShapeRegisterDefinition } from '../types';
import { nameEllipsis } from '../../../utils';

export const colorMap = {
  greenLight2: '#52c41a',
  yellowLight2: '#faad14',
  orangeLight2: '#ff4d4f',
};

export interface FlowRectNode extends ModelConfig {
  name: string;
  /**
   * 颜色
   */
  color: string;
  /**
   * 是否折叠
   */
  collapsed: boolean;
  /**
   * 相关信息源
   */
  information: { id: string; name: string }[];
  children: [];
}

/**
 * 节点对象
 */
const node: ShapeRegisterDefinition = {
  type: 'node',
  name: 'flow-rect',
  definition: {
    type: 'flow-rect',

    // 基本形状在这里绘制
    draw(cfg: FlowRectNode, group) {
      const { name = '', color, children, information, collapsed, id } = cfg;

      const hexColor = colorMap[color];

      const baseWidth = 200;

      const baseHeight = getHeightByInfoLength(information.length);

      const rectConfig = {
        width: baseWidth,
        height: baseHeight,
        lineWidth: 1,
        fontSize: 12,
        fill: '#fff',
        radius: 4,
        stroke: hexColor,
        opacity: 1,
      };

      const textConfig = {
        textAlign: 'left',
        textBaseline: 'top',
      };

      // 基本形状?
      const rect = group.addShape('rect', {
        attrs: {
          x: 0,
          y: 0,
          ...rectConfig,
          fill: hexColor,
          opacity: 0.1,
          cursor: 'pointer',
        },
        id,
      });

      // 标题
      group.addShape('text', {
        attrs: {
          ...textConfig,
          x: 12,
          y: 8,
          text: nameEllipsis(name, baseWidth - 40),

          fontSize: 14,
          fill: 'rgba(0,0,0,0.65)',
          cursor: 'pointer',
          isTitleShape: true,
        },
        id,
      });

      // 添加输入信息
      information.forEach((info, index) => {
        if (index > 3) {
          return;
        }

        const addInfoText = (text) => {
          group.addShape('rect', {
            attrs: {
              x: 12,
              y: 33 + index * 18,
              width: 2,
              radius: 1,
              height: 16,
              fill: '#e6f7ff',
            },
          });

          group.addShape('text', {
            attrs: {
              ...textConfig,
              x: 18,
              y: 34 + index * 18,
              text,
              fontSize: 12,
              cursor: 'pointer',
              fill: 'rgba(0,0,0,0.25)',
            },
            id: text === '...' ? id : info.id,
          });
        };

        const text = nameEllipsis(info.name, baseWidth - 30, 12);

        addInfoText(index > 2 ? '...' : text);
      });

      // 左侧高亮线
      group.addShape('rect', {
        attrs: {
          x: 0,
          y: 0,
          width: 4,
          height: rectConfig.height,
          radius: [rectConfig.radius, 0, 0, rectConfig.radius],
          fill: hexColor,
        },
      });

      // 绘制折叠按钮
      if (children.length > 0) {
        // collapse circle
        group.addShape('circle', {
          attrs: {
            x: rectConfig.width,
            y: rectConfig.height / 2,
            r: 8,
            stroke: hexColor,
            fill: collapsed ? hexColor : '#fff',
            isCollapseShape: true,
            cursor: 'pointer',
          },
        });

        // collapse text
        group.addShape('text', {
          attrs: {
            x: rectConfig.width,
            y: rectConfig.height / 2 - 1,
            width: 15,
            height: 15,
            textAlign: 'center',
            textBaseline: 'middle',
            text: collapsed ? '+' : '-',
            fontSize: 15,
            fill: collapsed ? '#fff' : hexColor,
            isCollapseShape: true,
            cursor: 'pointer',
          },
        });
      }

      this.drawLinkPoints(cfg, group);
      return rect;
    },
    // 更新是更新啥?
    update(cfg, item) {
      const group = item.getContainer();
      this.updateLinkPoints(cfg, group);
    },
    setState(name, value, item) {
      if (name === 'click' && value) {
        const group = item.getContainer();
        const { collapsed } = item.getModel();
        const [, , , , , , CircleShape, TextShape] = group.get('children');
        if (TextShape) {
          const {
            attrs: { stroke },
          } = CircleShape;
          if (!collapsed) {
            TextShape.attr({
              text: '-',
              fill: stroke,
            });
            CircleShape.attr({
              fill: '#fff',
            });
          } else {
            TextShape.attr({
              text: '+',
              fill: '#fff',
            });
            CircleShape.attr({
              fill: stroke,
            });
          }
        }
      }
    },
    getAnchorPoints() {
      return [
        [0, 0.5],
        [1, 0.5],
      ];
    },
  },
  // 注意这里继承了 'single-shape'
  extendShapeType: 'rect',
};

export default node;

export const getHeightByInfoLength = (length) => {
  switch (length) {
    case 0:
      return 30;
    case 1:
      return 64;
    case 2:
      return 80;
    case 3:
      return 100;
    default:
      return 110;
  }
};
