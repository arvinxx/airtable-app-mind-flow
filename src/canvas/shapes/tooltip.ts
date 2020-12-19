import showdown from 'showdown';
import { FlowNode } from './node';

const tooltip = (model: FlowNode) => {
  const converter = new showdown.Converter();
  return `
<div>
  <div class="g6-tooltip-title">🚩 ${model.name}</div>
    ${
      model.description
        ? `<div class="g6-tooltip-description">${converter.makeHtml(
            model.description
          )}</div>`
        : ''
    }
    ${
      model.information.length > 0
        ? `
            <div>
              <div class="g6-tooltip-information">💡 相关信息源/场景/前置条件</div>
              ${model.information
                .map(
                  (info) =>
                    `<div class="g6-tooltip-info-item">· ${info.name}</div>`
                )
                .join('')}
            </div>
          `
        : ''
    }
</div>
`;
};

export default tooltip;
