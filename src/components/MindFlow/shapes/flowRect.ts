import { ModelConfig } from '@antv/g6/es/types';
import { ShapeRegisterDefinition } from './type';

interface FlowRectConfig extends ModelConfig {
  name: string;
  /**
   * 是否折叠
   */
  collapsed: boolean;
}

/**
 * 节点对象
 */
const flowRect: ShapeRegisterDefinition = {
  type: 'node',
  name: 'flow-rect',
  definition: {
    shapeType: 'flow-rect',

    // 基本形状在这里绘制
    draw(cfg: FlowRectConfig, group) {
      const { name = '', lightColor, hasChildren, label, collapsed } = cfg;

      const rectConfig = {
        width: 184,
        height: 74,
        lineWidth: 1,
        fontSize: 12,
        fill: '#fff',
        radius: 4,
        stroke: lightColor,
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
        },
      });

      // 标题
      group.addShape('text', {
        attrs: {
          ...textConfig,
          x: 12,
          y: 8,
          text: name.length > 16 ? name.substr(0, 16) + '...' : name,
          fontSize: 16,
          fill: 'rgba(0,0,0,0.85)',
          cursor: 'pointer',
          isTitleShape: true,
        },
      });

      // 信息源
      group.addShape('text', {
        attrs: {
          ...textConfig,
          x: 12,
          y: 34,
          text: label,
          fontSize: 14,
          fill: 'rgba(0,0,0,0.45)',
        },
      });

      // 底部灰线
      group.addShape('rect', {
        attrs: {
          x: 0,
          y: 70,
          width: rectConfig.width,
          height: 4,
          radius: [0, 0, rectConfig.radius, rectConfig.radius],
          fill: '#DCDFE5',
        },
      });

      // 底部亮线
      group.addShape('rect', {
        attrs: {
          x: 0,
          y: 70,
          width: rectConfig.width,
          height: 4,
          radius: [0, 0, 0, rectConfig.radius],
          fill: lightColor,
        },
      });

      // 绘制折叠按钮
      if (hasChildren) {
        // collapse circle
        group.addShape('circle', {
          attrs: {
            x: rectConfig.width,
            y: rectConfig.height / 2,
            r: 8,
            stroke: lightColor,
            fill: collapsed ? lightColor : '#fff',
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
            fill: collapsed ? '#fff' : lightColor,
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
export default flowRect;
