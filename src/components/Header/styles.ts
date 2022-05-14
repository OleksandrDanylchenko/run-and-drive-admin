import { css } from '@emotion/react';
import { flexbox, pxToRem } from 'run-and-drive-lib/styles';

export const HeaderToolbar = css`
  justify-content: space-between;
  gap: 10px;
`;

export const HeaderTitle = css`
  ${flexbox({ alignItems: 'center', gap: '10px' })}
  font-size: ${pxToRem('22px')};
  font-weight: 500;
`;

export const ProfileButton = css`
  text-transform: inherit;
  color: inherit;
  gap: 10px;
`;
