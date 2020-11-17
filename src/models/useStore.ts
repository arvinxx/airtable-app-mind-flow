import {
  Field,
  FieldType,
  RecordQueryResult,
  Table,
  View,
} from '@airtable/blocks/models';
import { useBase } from '@airtable/blocks/ui';
import { useGlobalSettings, GlobalSettingsState } from './useGlobalSettings';

export const allowedFieldTypes = [FieldType.MULTIPLE_RECORD_LINKS];

export interface SettingsState {
  table: Table;
  view: View;
  howField: Field;
  infoField: Field;
  queryResult: RecordQueryResult;
}

const getStore = (rawSettings: GlobalSettingsState, base): SettingsState => {
  const table = base.getTableByIdIfExists(rawSettings.TABLE_ID);
  const view = table?.getViewByIdIfExists(rawSettings.VIEW_ID);
  const howField = table?.getFieldByIdIfExists(rawSettings.HOW_FIELD_ID);
  const infoField = table?.getFieldByIdIfExists(rawSettings.WHY_HOW_FIELD_ID);
  const queryResult =
    view && howField && infoField
      ? view.selectRecords({ fields: [table.primaryField, howField] })
      : null;

  return {
    table,
    view,
    howField,
    infoField,
    queryResult,
  };
};

/**
 * Wraps the settings with validation information
 * @param {object} settings - The object returned by getSettings
 * @returns {{settings: object, isValid: boolean} | {settings: object, isValid: boolean, message: string}}
 */
const validationQueryResult = (settings: SettingsState) => {
  const { queryResult, table, howField, infoField } = settings;
  if (!queryResult) {
    return {
      isValid: false,
      message: 'Pick a table, view, and linked record field',
      settings,
    };
  } else if (howField.type !== FieldType.MULTIPLE_RECORD_LINKS) {
    return {
      isValid: false,
      message: 'Select a linked record field',
      settings,
    };
  } else if (howField.options.linkedTableId !== table.id) {
    return {
      isValid: false,
      message: 'Linked record field must be linked to same table',
      settings,
    };
  } else if (infoField.type !== FieldType.MULTIPLE_RECORD_LINKS) {
    return {
      isValid: false,
      message: 'Select a linked record field',
      settings,
    };
  } else if (infoField.options.linkedTableId !== table.id) {
    return {
      isValid: false,
      message: 'Linked record field must be linked to same table',
      settings,
    };
  }

  return {
    isValid: true,
    settings,
  };
};

/**
 * A React hook to validate and access settings configured in SettingsForm.
 * @returns {{settings: object, isValid: boolean, message: string} | {settings: object, isValid: boolean}}
 */
export const useStore = () => {
  const base = useBase();
  const rawSettings = useGlobalSettings();

  const settings = getStore(rawSettings, base);
  return validationQueryResult(settings);
};
