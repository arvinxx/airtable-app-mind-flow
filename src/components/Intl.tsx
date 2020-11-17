import React from 'react';
import { IntlProvider as IntlProvider_ } from 'react-intl';
import sourceOfTruth from '../locales/en-US';

export type LocaleMessages = typeof sourceOfTruth;
export type LocaleKey = keyof LocaleMessages;

export const IntlProvider: React.FC<
  Omit<React.ComponentProps<typeof IntlProvider_>, 'messages'> & {
    messages: LocaleMessages;
  }
> = (props) => <IntlProvider_ {...props} />;
