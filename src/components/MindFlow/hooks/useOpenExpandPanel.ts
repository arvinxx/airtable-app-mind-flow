import { useEffect } from 'react';
import { TreeGraph } from '@antv/g6';
import { expandRecord, useRecords } from '@airtable/blocks/ui';
import { useStore } from '../../../models';

/**
 * 点击对象打开操作面板的 hooks
 * @param treeGraph 需要传入的 TreeGraph 对象
 */
export const useOpenExpandPanel = (treeGraph: TreeGraph | undefined) => {
  const { settings } = useStore();
  const records = useRecords(settings && settings.table);

  useEffect(() => {
    if (!treeGraph) return;

    const expendPanel = (event: any) => {
      const { target } = event;
      // 获取节点的 id 值
      const { id } = target.cfg;

      // 如果记录存在 则打开面板
      const record = records.find((r) => r.id === id);
      if (!record) return;

      expandRecord(record);
    };

    treeGraph.on('node:click', expendPanel);
  }, [treeGraph, records]);
};
