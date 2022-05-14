import { css, Theme } from '@emotion/react';

export const DashboardGrid = (theme: Theme) => css`
  --map-item-height: 275px;

  height: calc(100vh - ${theme.mixins.toolbar.minHeight}px - 10px);
  margin-top: 0;
  padding-right: 10px;
  padding-bottom: 16px;
  padding-left: 10px;
`;

export const MapItem = css`
  flex-basis: var(--map-item-height);
`;
