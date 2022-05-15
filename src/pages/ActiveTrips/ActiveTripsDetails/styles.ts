import { css, Theme } from '@emotion/react';
import { getMuiToolbarHeight } from 'run-and-drive-lib/styles';

export const DetailsWrapper = css`
  position: relative;
  height: 100%;
`;

export const DetailsGrid = css`
  height: 100%;
  margin-top: 0;
`;

export const DetailsGridItem = (theme: Theme) =>
  css`
    ${getMuiToolbarHeight(theme)};

    height: calc(100vh - var(--toolbar-height) - ${16 * 3}px - var(--map-item-height));
    overflow-y: auto;
    padding-top: 0 !important;
  `;

export const CloseButton = css`
  position: absolute !important;
  top: 2px;
  right: 15px;
  z-index: 1;
`;
