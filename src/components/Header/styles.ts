import { css } from '@emotion/react';
import { flexbox, pxToRem } from 'run-and-drive-lib/styles';

export const HeaderToolbar = css`
  gap: ${pxToRem('10px')};
`;

export const HeaderTitle = css`
  ${flexbox({ alignItems: 'center', gap: '10px' })}
  font-size: ${pxToRem('22px')};
  font-weight: 500;
`;

export const HeaderButton = css`
  font-size: 1.2em;
  color: inherit;
  text-transform: none;
`;
