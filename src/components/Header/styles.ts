import { css } from '@emotion/react';
import { Theme } from '@mui/material';
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

export const AccountButton = css`
  text-transform: inherit;
  color: inherit;
  gap: 10px;
`;

export const AccountAvatar = (theme: Theme) => css`
  --size: 0;

  width: var(--size);
  height: var(--size);
  background-color: ${theme.palette.info.dark};

  &.header {
    --size: 32px;
  }

  &.list {
    --size: 25px;
  }
`;
