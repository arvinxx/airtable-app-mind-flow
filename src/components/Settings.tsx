import React, { FC, Fragment, MutableRefObject } from 'react';
import {
  Box,
  Button,
  FieldPickerSynced,
  FormField,
  Heading,
  SelectButtons,
  Link,
  TablePickerSynced,
  Text,
  ViewPickerSynced,
} from '@airtable/blocks/ui';

import {
  allowedFieldTypes,
  GlobalSettingsKeys,
  SettingsState,
  useFormatMessage,
  useI18n,
  useShowSettings,
} from '../models';

interface SettingsProps {
  graph: MutableRefObject<HTMLDivElement>;
  settings: SettingsState;
  isValid: boolean;
}

const Settings: FC<SettingsProps> = ({ settings }) => {
  const { setShowSettings } = useShowSettings();
  const { locale, canSetValue, setLocale } = useI18n();
  const f = useFormatMessage();
  return (
    <Box
      flex="none"
      display="flex"
      flexDirection="column"
      width="300px"
      zIndex={100}
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
        <Heading marginBottom={3}>{f('settings')}</Heading>

        <FormField label={f('settings.language')}>
          <SelectButtons
            value={locale || 'en'}
            onChange={(value) => {
              if (canSetValue) {
                setLocale(value);
              } else {
                // me
              }
            }}
            options={[
              { label: 'English', value: 'en' },
              { label: '中文', value: 'zh' },
            ]}
          />
        </FormField>
        <FormField
          label={f('settings.table')}
          description={f('settings.table.description')}
        >
          <TablePickerSynced globalConfigKey={GlobalSettingsKeys.TABLE_ID} />
        </FormField>
        {settings.table && (
          <Fragment>
            <FormField
              label={f('settings.view')}
              description={f('settings.view.description')}
            >
              <ViewPickerSynced
                table={settings.table}
                globalConfigKey={GlobalSettingsKeys.VIEW_ID}
              />
            </FormField>
            <FormField
              label={f('settings.how-field')}
              description={f('settings.how-field.description')}
            >
              <FieldPickerSynced
                table={settings.table}
                globalConfigKey={GlobalSettingsKeys.HOW_FIELD_ID}
                allowedTypes={allowedFieldTypes}
              />
            </FormField>
            <FormField
              label={f('settings.why-how-field')}
              description={f('settings.why-how-field.description')}
            >
              <FieldPickerSynced
                table={settings.table}
                globalConfigKey={GlobalSettingsKeys.WHY_HOW_FIELD_ID}
                allowedTypes={allowedFieldTypes}
              />
            </FormField>{' '}
            <FormField
              label={f('settings.why-this-field')}
              description={f('settings.why-this-field.description')}
            >
              <FieldPickerSynced
                table={settings.table}
                globalConfigKey={GlobalSettingsKeys.WHY_THIS_FIELD_ID}
                allowedTypes={allowedFieldTypes}
              />
            </FormField>
            <Box marginBottom={1}>
              <Text fontWeight="strong" textColor="light">
                {f('settings.node-color')}
              </Text>
              <Text variant="paragraph" textColor="light">
                {f('settings.node-color.description')}

                <Link
                  href="https://support.airtable.com/hc/en-us/articles/115013883908-Record-coloring-overview"
                  target="_blank"
                >
                {f('settings.node-color.ref')}

                </Link>
              </Text>
            </Box>
          </Fragment>
        )}
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
          {f('settings.button.confirm')}
        </Button>
      </Box>
    </Box>
  );
};

export default Settings;
