import { css } from '@emotion/react';

import { headerHeight } from '@styles/constants';

export const DashboardGrid = css`
  height: calc(100vh - ${headerHeight});
  margin-top: 0;
  padding-right: 10px;
  padding-bottom: 16px;
  padding-left: 10px;
`;
