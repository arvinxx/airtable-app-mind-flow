import { useGlobalConfig } from '@airtable/blocks/ui';

export const GlobalSettingsKeys = {
  LANGUAGE: 'LANGUAGE',
  TABLE_ID: 'TABLE_ID',
  VIEW_ID: 'VIEW_ID',
  HOW_FIELD_ID: 'HOW_FIELD_ID',
  WHY_HOW_FIELD_ID: 'WHY_HOW_FIELD_ID',
  WHY_THIS_FIELD_ID: 'WHY_THIS_FIELD_ID',
};

export type GlobalSettingsState = Record<
  keyof typeof GlobalSettingsKeys,
  string
>;

const defaultState: GlobalSettingsState = {
  LANGUAGE: navigator.language,
  HOW_FIELD_ID: '',
  WHY_HOW_FIELD_ID: '',
  TABLE_ID: '',
  VIEW_ID: '',
  WHY_THIS_FIELD_ID: '',
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
