import React, { useEffect } from 'react';
import { LocaleKey, LocaleMessages } from '../components';
import { PrimitiveType } from 'intl-messageformat';
import { useIntl } from 'react-intl';
import { useSynced } from '@airtable/blocks/ui';
import { GlobalSettingsKeys } from './useGlobalSettings';

export type SupportedLocales = 'en-US' | 'en' | 'zh' | 'zh-CN';

function importMessages(locale: SupportedLocales): Promise<LocaleMessages> {
  switch (locale) {
    case 'en':
    case 'en-US':
    default:
      return import('../locales/en-US').then((m) => m.default);
    case 'zh':
    case 'zh-CN':
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
  const locale = (syncData || navigator.language) as SupportedLocales;

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
