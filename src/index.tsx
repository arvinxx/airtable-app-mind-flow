import React from 'react';
import { initializeBlock } from '@airtable/blocks/ui';
import AppWrapper from './AppWrapper';
import { devtools } from 'stook-devtools';

if (process.env.NODE_ENV !== 'production') {
  devtools.init();
}

initializeBlock(() => <AppWrapper />);
