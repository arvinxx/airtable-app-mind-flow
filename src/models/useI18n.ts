import React, { useEffect } from 'react';
import { LocaleKey, LocaleMessages } from '../components';
import { PrimitiveType } from 'intl-messageformat';
import { useIntl } from 'react-intl';
import { useSynced } from '@airtable/blocks/ui';
import { GlobalSettingsKeys } from './useGlobalSettings';

export type SupportedLocales = 'en' | 'zh';

function importMessages(locale: SupportedLocales): Promise<LocaleMessages> {
  switch (locale) {
    case 'en':
    default:
      return import('../locales/en-US').then((m) => m.default);
    case 'zh':
      return import('../locales/zh-CN').then((m) => m.default);
  }
}

/**
 *
 */
export const useI18n = () => {
  const [syncData, setLocale, canSetValue] = useSynced(
    GlobalSettingsKeys.LANGUAGE
  );
  const locale = syncData as SupportedLocales;

  const [messages, setMessages] = React.useState<LocaleMessages | null>(null);

  useEffect(() => {
    importMessages(locale)?.then(setMessages);
  }, [locale]);
  return { locale, messages, setLocale, canSetValue };
};

export const useFormatMessage = (): ((
  id: LocaleKey, // only accepts valid keys, not any string
  values?: Record<string, PrimitiveType>
) => string) => {
  const intl = useIntl();
  return (id, values) => intl.formatMessage({ id }, values);
};
