import { useGlobalConfig } from '@airtable/blocks/ui';
import { Overwrite } from 'utility-types';
import { SupportedLocales } from './useI18n';

export const GlobalSettingsKeys = {
  LANGUAGE: 'LANGUAGE',
  TABLE_ID: 'TABLE_ID',
  VIEW_ID: 'VIEW_ID',
  HOW_FIELD_ID: 'HOW_FIELD_ID',
  WHY_HOW_FIELD_ID: 'WHY_HOW_FIELD_ID',
  WHY_THIS_FIELD_ID: 'WHY_THIS_FIELD_ID',
  /**
   * 是否下钻
   */
  IS_DRILL_DOWN: 'IS_DRILL_DOWN',
  /**
   * 下钻的节点 ID
   */
  DRILL_DOWN_NODE_ID: 'DRILL_DOWN_NODE_ID',
  /**
   * 下钻的层数
   */
  DRILL_DOWN_DEPTH: 'DRILL_DOWN_DEPTH',
};

export type GlobalSettingsState = Overwrite<
  Record<keyof typeof GlobalSettingsKeys, string>,
  {
    IS_DRILL_DOWN: boolean;
    LANGUAGE: SupportedLocales;
    DRILL_DOWN_NODE_ID?: string;
    DRILL_DOWN_DEPTH?: number;
  }
>;

const defaultState: GlobalSettingsState = {
  LANGUAGE: navigator.language as SupportedLocales,
  HOW_FIELD_ID: '',
  WHY_HOW_FIELD_ID: '',
  TABLE_ID: '',
  VIEW_ID: '',
  WHY_THIS_FIELD_ID: '',
  IS_DRILL_DOWN: false,
};

/**
 *
 */
export const useGlobalSettings = () => {
  const globalConfig = useGlobalConfig();

  const rawSettings = {};
  for (const globalConfigKey of Object.values(GlobalSettingsKeys)) {
    const storedValue = globalConfig.get(globalConfigKey);
    if (storedValue === undefined) {
      rawSettings[globalConfigKey] = defaultState[globalConfigKey];
    } else {
      rawSettings[globalConfigKey] = storedValue;
    }
  }

  return rawSettings as GlobalSettingsState;
};
