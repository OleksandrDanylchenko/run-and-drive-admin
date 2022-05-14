import { css, Theme } from '@emotion/react';

export const DashboardGrid = (theme: Theme) => css`
  height: calc(100vh - ${theme.mixins.toolbar.minHeight}px - 10px);
  margin-top: 0;
  padding-right: 10px;
  padding-bottom: 16px;
  padding-left: 10px;
`;

export const InfoItem = css`
  height: 100%;
`;
