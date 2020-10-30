import React, { FC, Fragment, MutableRefObject } from 'react';
import {
  Box,
  Button,
  FieldPickerSynced,
  FormField,
  Heading,
  Label,
  Link,
  TablePickerSynced,
  Text,
  ViewPickerSynced,
} from '@airtable/blocks/ui';

import {
  allowedFieldTypes,
  GlobalSettingsKeys,
  SettingsState,
  useShowSettings,
} from '../models';
import { exportToPng, exportToSvg, ExportType } from '../utils';

interface SettingsProps {
  graph: MutableRefObject<HTMLDivElement>;
  settings: SettingsState;
  isValid: boolean;
}

const Settings: FC<SettingsProps> = ({ settings, isValid, graph }) => {
  const { setShowSettings } = useShowSettings();

  const onExportGraph = (exportType: ExportType) => {
    const { view } = settings;
    // 没有视图就结束
    if (!(view && graph.current)) return;

    // 没有对象也结束
    const element = graph.current.firstElementChild;
    if (!element) return;

    const name = view.name;

    if (exportType === ExportType.PNG) {
      exportToPng(element, name);
    } else if (exportType === ExportType.SVG) {
      exportToSvg(element, name);
    } else {
      throw new Error(`Unexpected export type: ${exportType}`);
    }
  };

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
        <Heading marginBottom={3}>设置</Heading>
        <FormField label="表格">
          <TablePickerSynced globalConfigKey={GlobalSettingsKeys.TABLE_ID} />
        </FormField>
        {settings.table && (
          <Fragment>
            <FormField
              label="视图"
              description="请选择只包含问题/思路/行动点的视图"
            >
              <ViewPickerSynced
                table={settings.table}
                globalConfigKey={GlobalSettingsKeys.VIEW_ID}
              />
            </FormField>
            <FormField label="思路/问题/行动点字段" description="关联 How 的字段">
              <FieldPickerSynced
                table={settings.table}
                globalConfigKey={GlobalSettingsKeys.HOW_FIELD_ID}
                allowedTypes={allowedFieldTypes}
              />
            </FormField>
            <FormField
              label="信息输入字段"
              description="关于信息输入的字段"
            >
              <FieldPickerSynced
                table={settings.table}
                globalConfigKey={GlobalSettingsKeys.INFO_FIELD_ID}
                allowedTypes={allowedFieldTypes}
              />
            </FormField>
            <Box marginBottom={1}>
              <Text fontWeight="strong" textColor="light">
                节点颜色
              </Text>
              <Text variant="paragraph" textColor="light">
                节点基于
                <Link
                  href="https://support.airtable.com/hc/en-us/articles/115013883908-Record-coloring-overview"
                  target="_blank"
                >
                  视图包含的颜色
                </Link>
                进行着色
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
        <Box display="flex" alignItems="center">
          {/*<Label marginRight={2} marginBottom={0}>*/}
          {/*  导出*/}
          {/*</Label>*/}
          {/*<Button*/}
          {/*  disabled={!isValid}*/}
          {/*  onClick={() => onExportGraph(ExportType.SVG)}*/}
          {/*  marginRight={2}*/}
          {/*>*/}
          {/*  SVG*/}
          {/*</Button>*/}
          {/*<Button*/}
          {/*  disabled={!isValid}*/}
          {/*  onClick={() => onExportGraph(ExportType.PNG)}*/}
          {/*>*/}
          {/*  PNG*/}
          {/*</Button>*/}
        </Box>
        <Button variant="primary" onClick={() => setShowSettings(false)}>
          确定
        </Button>
      </Box>
    </Box>
  );
};

export default Settings;
