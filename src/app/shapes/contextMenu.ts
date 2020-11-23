import G6 from '@antv/g6';
import { Item } from '@antv/g6/es/types';

const contextMenu = new G6.Menu({
  getContent() {
    return `
<div>
<ul>
  <li title="drill-down">下钻</li>
</ul>
<span class="divider" ></span>
<ul>
  <li>移除节点</li>
  <li>删除记录</li>
</ul>
</div>
`;
  },
  handleMenuClick: (target: HTMLUListElement, item: Item) => {
    if (target.getAttribute('title') === 'drill-down') {
      item.setState('drill-down', 'true');
      // console.log();
    }
  },
  // offsetX and offsetY include the padding of the parent container
  // 需要加上父级容器的 padding-left 16 与自身偏移量 10
  offsetX: 16 + 10,
  // 需要加上父级容器的 padding-top 24 、画布兄弟元素高度、与自身偏移量 10
  offsetY: 0,
  // the types of items that allow the menu show up
  // 在哪些类型的元素上响应
  itemTypes: ['node'],
});

export default contextMenu;
