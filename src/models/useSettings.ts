import {
  Field,
  FieldType,
  RecordQueryResult,
  Table,
  View,
} from '@airtable/blocks/models';
import { useBase } from '@airtable/blocks/ui';
import { useGlobalSettings } from './useGlobalSettings';

export const allowedFieldTypes = [FieldType.MULTIPLE_RECORD_LINKS];

export enum RecordShape {
  ROUNDED = 'rounded',
  RECTANGLE = 'rectangle',
  ELLIPSE = 'ellipse',
  CIRCLE = 'circle',
  DIAMOND = 'diamond',
}

export enum LinkStyle {
  RIGHT_ANGLES = 'rightAngles',
  STRAIGHT_LINES = 'straightLines',
  CURVED_LINES = 'curvedLines',
}

export enum ChartOrientation {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

export interface SettingsState {
  table: Table;
  view: View;
  field: Field;
  queryResult: RecordQueryResult;
}

/**
 * Takes values read from GlobalConfig and converts them to Airtable objects where possible.
 * Also creates an extra key for queryResult which is derived from view and field.
 * @param {object} rawSettings - The object returned by getRawSettingsWithDefaults
 * @param {Base} base - The base being used by the app in order to convert id's to objects
 * @returns {{
 *     table: Table | null,
 *     view: View | null,
 *     field: Field | null,
 *     queryResult: RecordQueryResult | null,
 *     chartOrientation: ChartOrientation,
 *     linkStyle: LinkStyle,
 *     recordShape: RecordShape,
 * }}
 */
function getSettings(rawSettings, base): SettingsState {
  const table = base.getTableByIdIfExists(rawSettings.tableId);
  const view = table ? table.getViewByIdIfExists(rawSettings.viewId) : null;
  const field = table ? table.getFieldByIdIfExists(rawSettings.fieldId) : null;
  const queryResult =
    view && field
      ? view.selectRecords({ fields: [table.primaryField, field] })
      : null;
  return {
    table,
    view,
    field,
    queryResult,
  };
}

/**
 * Wraps the settings with validation information
 * @param {object} settings - The object returned by getSettings
 * @returns {{settings: object, isValid: boolean} | {settings: object, isValid: boolean, message: string}}
 */
function getSettingsValidationResult(settings) {
  const { queryResult, table, field } = settings;
  if (!queryResult) {
    return {
      isValid: false,
      message: 'Pick a table, view, and linked record field',
      settings: settings,
    };
  } else if (field.type !== FieldType.MULTIPLE_RECORD_LINKS) {
    return {
      isValid: false,
      message: 'Select a linked record field',
      settings: settings,
    };
  } else if (field.options.linkedTableId !== table.id) {
    return {
      isValid: false,
      message: 'Linked record field must be linked to same table',
      settings: settings,
    };
  }
  return {
    isValid: true,
    settings: settings,
  };
}

/**
 * A React hook to validate and access settings configured in SettingsForm.
 * @returns {{settings: object, isValid: boolean, message: string} | {settings: object, isValid: boolean}}
 */
export const useSettings = () => {
  const base = useBase();
  const rawSettings = useGlobalSettings();
  const settings = getSettings(rawSettings, base);
  return getSettingsValidationResult(settings);
};
