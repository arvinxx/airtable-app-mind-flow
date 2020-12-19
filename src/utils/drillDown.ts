import { TreeGraph } from '@antv/g6';
import { Item } from '@antv/g6/lib/types';

export const getDrillDownNodeChain = (treeGraph: TreeGraph, item: Item) => {
  const id = item.getModel()?.id;
  const name = item.getModel().name;

  const depth = item.getModel().depth;
  // 必须存在才行
  if (!id) return;

  const nodeChain = [];
  nodeChain.push({ id, name });

  // 定义爹 id
  let parentId = item.getModel()?.parent as string;

  // 如果没爹 说明是老大 不进行下钻
  if (!parentId) return;

  for (let i = 0; i < depth; i++) {
    if (parentId) {
      const parentNode = treeGraph.findById(parentId).getModel();

      nodeChain.push({
        id: parentId,
        name: parentNode.name as string,
      });
      // 推入之后再查一次爹的爹 id
      parentId = parentNode.parent as string;
    }
  }

  // 顺序翻转 把根节点放最前面
  return nodeChain.reverse();
};
