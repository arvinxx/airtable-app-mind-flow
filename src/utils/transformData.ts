import { SettingsState } from '../models';
import { Record } from '@airtable/blocks/models';

/**
 * 给 treeGraph 使用的数据转换方法
 * @param settings
 * @param firstNodeId
 */
export const transformData = async (
  settings: SettingsState,
  firstNodeId?: string
) => {
  const { queryResult, view, infoField, howField } = settings;

  if (!queryResult) return;

  await queryResult.loadDataAsync();

  const node = queryResult.records.find((r) => r.id === firstNodeId);

  // 默认使用第一条记录作为首个节点
  const firstNode = node || queryResult.records[0];

  /**
   * 将记录映射为图数据
   * @param record
   * @param parentId
   */
  const mapRecordToData = async (record: Record, parentId: string) => {
    const howRecords = await record.selectLinkedRecordsFromCellAsync(howField);
    const infoRecords = await record.selectLinkedRecordsFromCellAsync(
      infoField
    );

    const childrenInPromise = howRecords.records.map((r) =>
      mapRecordToData(r, record.id)
    );
    const children = await Promise.all(childrenInPromise);

    return {
      id: record.id,
      parent: parentId,
      name: record.name,
      description: record?.getCellValue('描述'),
      color: record.getColorInView(view),
      information: infoRecords.records.map((r) => ({ id: r.id, name: r.name })),
      children,
    };
  };

  return await mapRecordToData(firstNode, null);
};
