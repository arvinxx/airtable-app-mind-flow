import { SettingsState } from '../models';
import { Record } from '@airtable/blocks/models';

/**
 * 给 treeGraph 使用的数据转换方法
 * @param settings
 */
export const transformData = async (settings: SettingsState) => {
  const { queryResult, view, infoField, howField } = settings;

  if (!queryResult) return;

  await queryResult.loadDataAsync();

  const firstNode = queryResult.records[0];

  const mapRecordToData = async (record: Record) => {
    const howRecords = await record.selectLinkedRecordsFromCellAsync(howField);
    const infoRecords = await record.selectLinkedRecordsFromCellAsync(
      infoField
    );

    const childrenInPromise = howRecords.records.map(mapRecordToData);
    const children = await Promise.all(childrenInPromise);
    return {
      id: record.id,
      name: record.name,
      color: record.getColorInView(view),
      information: infoRecords.records.map((r) => ({ id: r.id, name: r.name })),
      children,
    };
  };

  return await mapRecordToData(firstNode);
};
