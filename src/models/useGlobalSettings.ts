import { useGlobalConfig } from '@airtable/blocks/ui';

export const GlobalSettingsKeys = {
  TABLE_ID: 'TABLE_ID',
  VIEW_ID: 'VIEW_ID',
  FIELD_ID: 'FIELD_ID',
};

interface GlobalSettingsState {
  FIELD_ID: string;
  TABLE_ID: string;
  VIEW_ID: string;
}

const defaultState: GlobalSettingsState = {
  FIELD_ID: '',
  TABLE_ID: '',
  VIEW_ID: '',
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
