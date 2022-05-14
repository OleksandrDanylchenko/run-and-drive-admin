import { css, Theme } from '@emotion/react';
import { pxToRem, getMuiToolbarHeight } from 'run-and-drive-lib/styles';

export const DetailsWrapper = css`
  height: 100%;
`;

export const DetailsGrid = css`
  height: 100%;
  margin-top: 0;
  padding-left: ${pxToRem('15px')};
`;

export const DetailsGridItem = (theme: Theme) =>
  css`
    ${getMuiToolbarHeight(theme)};

    height: calc(100vh - var(--toolbar-height) - ${16 * 3}px - var(--map-item-height));
    overflow-y: auto;
  `;

export const CloseButton = css`
  position: absolute !important;
  top: 2px;
  left: 5px;
  z-index: 1;
`;
