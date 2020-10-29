import React, { FC } from 'react';
import { Box, Button, FormField, Heading } from '@airtable/blocks/ui';

import { useShowSettings } from '../models';

interface SettingsProps {}

const Settings: FC<SettingsProps> = () => {
  const { setShowSettings } = useShowSettings();

  return (
    <Box
      flex="none"
      display="flex"
      flexDirection="column"
      width="300px"
      backgroundColor="white"
    >
      <Box
        flex="auto"
        display="flex"
        flexDirection="column"
        minHeight="0"
        padding={3}
        overflowY="auto"
      >
        <Heading marginBottom={3}>设置面板</Heading>
        <FormField label="表格">
          {/*<TablePickerSynced globalConfigKey={ConfigKeys.TABLE_ID} />*/}
        </FormField>
      </Box>
      <Box
        flex="none"
        display="flex"
        justifyContent="space-between"
        paddingY={3}
        marginX={3}
        borderTop="thick"
      >
        <Box display="flex" alignItems="center" />
        <Button variant="primary" onClick={() => setShowSettings(false)}>
          确定
        </Button>
      </Box>
    </Box>
  );
};

export default Settings;
