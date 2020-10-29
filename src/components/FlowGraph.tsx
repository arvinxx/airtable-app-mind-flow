import React, { FC, MutableRefObject } from 'react';
import {
  expandRecord,
  Loader,
  useLoadable,
  useWatchable,
} from '@airtable/blocks/ui';

import { createLayout } from '../utils/layout';

import { useSettings } from '../models';

// viz.js has a stack overflow when there are too many records. So add a limit to be safe.
const MAX_RECORDS = 100;

const domParser = new DOMParser();

interface FlowGraphProps {
  graph: MutableRefObject<HTMLDivElement>;
}
const FlowGraph: FC<FlowGraphProps> = ({ graph }) => {
  const settingsValidationResult = useSettings();

  const { queryResult } = settingsValidationResult.settings;
  useLoadable(queryResult);
  useWatchable(queryResult, ['records', 'cellValues', 'recordColors']);

  function draw() {
    if (!graph.current) {
      // Return early if ref isn't ready yet.
      return;
    }
    if (!settingsValidationResult.isValid) {
      graph.current.innerHTML = `<span class="prompt">${settingsValidationResult.message}</span>`;
      return;
    }

    if (!queryResult.isDataLoaded) {
      graph.current.innerHTML = '<span class="prompt">Loading...</span>';
    } else if (queryResult.records.length === 0) {
      graph.current.innerHTML =
        '<span class="prompt">Add some records to get started</span>';
    } else if (queryResult.records.length > MAX_RECORDS) {
      graph.current.innerHTML = `<span class="prompt">
                    The flowchart app can only visualize up to ${MAX_RECORDS} records. Try deleting some records or 
                    filtering them out of the view.
                </span>`;
    } else {
      createLayout(settingsValidationResult.settings).then((svg) => {
        const svgDocument = domParser.parseFromString(svg, 'image/svg+xml');
        const svgElement = svgDocument.firstElementChild;
        if (svgElement && graph.current) {
          // Set the width and height of the SVG element so that it takes up the full dimensions of the
          // app frame.
          const width = svgElement.getAttribute('width');
          const height = svgElement.getAttribute('height');
          if (Number(width) > Number(height)) {
            svgElement.setAttribute('width', '100%');
            svgElement.removeAttribute('height');
          } else {
            svgElement.setAttribute('height', '100%');
            svgElement.removeAttribute('width');
          }
          graph.current.innerHTML = '';
          graph.current.appendChild(svgElement);
        }
      });
    }
  }

  function onGraphClick(e) {
    if (!queryResult || !queryResult.isDataLoaded) {
      return;
    }
    let target = e.target || null;
    // Traverse up the element tree from the click event target until we find an svg element
    // describing a 'node' that has a corresponding record that we can expand.
    while (target && target !== graph.current) {
      if (target.classList.contains('node')) {
        const record = queryResult.getRecordByIdIfExists(target.id);
        if (record) {
          expandRecord(record);
          return;
        }
      }
      target = target.parentElement;
    }
  }

  draw();

  return (
    <div
      ref={graph}
      id="graph"
      style={{
        flex: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 0,
        height: '100%',
      }}
      onClick={onGraphClick}
    >
      <Loader />
    </div>
  );
};

export default FlowGraph;
