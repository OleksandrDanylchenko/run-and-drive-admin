import { css, Theme } from '@emotion/react';

export const DashboardGrid = (theme: Theme) => css`
  min-height: calc(100vh - ${theme.mixins.toolbar.minHeight}px);
  margin-top: 0;
  padding-right: 10px;
  padding-bottom: 16px;
  padding-left: 10px;
`;
