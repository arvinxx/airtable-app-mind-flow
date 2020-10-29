import React, { FC, Fragment, MutableRefObject } from 'react';
import {
  Box,
  Button,
  FieldPickerSynced,
  FormField,
  Heading,
  Label,
  Link,
  SelectButtonsSynced,
  SelectSynced,
  TablePickerSynced,
  Text,
  ViewPickerSynced,
} from '@airtable/blocks/ui';

import {
  allowedFieldTypes,
  ConfigKeys,
  LinkStyle,
  ChartOrientation,
  RecordShape,
  SettingsState,
  useShowSettings,
} from '../models';
import { exportToPng, exportToSvg, ExportType } from '../utils/exportImage';

interface SettingsProps {
  graph: MutableRefObject<HTMLDivElement>;
  settingsValidationResult: {
    settings: SettingsState;
    isValid: boolean;
  };
}

const Settings: FC<SettingsProps> = ({ settingsValidationResult, graph }) => {
  const { setShowSettings } = useShowSettings();

  const { settings, isValid } = settingsValidationResult;

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
          <TablePickerSynced globalConfigKey={ConfigKeys.TABLE_ID} />
        </FormField>
        {settings.table && (
          <Fragment>
            <FormField
              label="视图"
              description="请选择只包含问题/思路/行动点的视图"
            >
              <ViewPickerSynced
                table={settings.table}
                globalConfigKey={ConfigKeys.VIEW_ID}
              />
            </FormField>
            <FormField label="关联字段" description="互相关联的字段">
              <FieldPickerSynced
                table={settings.table}
                globalConfigKey={ConfigKeys.FIELD_ID}
                allowedTypes={allowedFieldTypes}
              />
            </FormField>
            <FormField
              label="图表方向"
              description={`所有节点将会按照下述方向进行连接 ${
                settings.chartOrientation === ChartOrientation.HORIZONTAL
                  ? ChartOrientation.VERTICAL
                  : ChartOrientation.HORIZONTAL
              }`}
            >
              <SelectButtonsSynced
                options={[
                  { label: '纵向', value: ChartOrientation.VERTICAL },
                  { label: '横向', value: ChartOrientation.HORIZONTAL },
                ]}
                globalConfigKey={ConfigKeys.CHART_ORIENTATION}
              />
            </FormField>
            <FormField label="链接样式">
              <SelectButtonsSynced
                options={[
                  { label: '直角', value: LinkStyle.RIGHT_ANGLES },
                  { label: '直线', value: LinkStyle.STRAIGHT_LINES },
                  { label: '曲线', value: LinkStyle.CURVED_LINES },
                ]}
                globalConfigKey={ConfigKeys.LINK_STYLE}
              />
            </FormField>
            <FormField label="节点形状">
              <SelectSynced
                options={[
                  { label: '请选择节点形状...', value: null, disabled: true },
                  { label: '圆角矩形', value: RecordShape.ROUNDED },
                  { label: '矩形', value: RecordShape.RECTANGLE },
                  { label: '椭圆', value: RecordShape.ELLIPSE },
                  { label: '正圆', value: RecordShape.CIRCLE },
                ]}
                globalConfigKey={ConfigKeys.RECORD_SHAPE}
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
          <Label marginRight={2} marginBottom={0}>
            导出
          </Label>
          <Button
            disabled={!isValid}
            onClick={() => onExportGraph(ExportType.SVG)}
            marginRight={2}
          >
            SVG
          </Button>
          <Button
            disabled={!isValid}
            onClick={() => onExportGraph(ExportType.PNG)}
          >
            PNG
          </Button>
        </Box>
        <Button variant="primary" onClick={() => setShowSettings(false)}>
          确定
        </Button>
      </Box>
    </Box>
  );
};

export default Settings;
