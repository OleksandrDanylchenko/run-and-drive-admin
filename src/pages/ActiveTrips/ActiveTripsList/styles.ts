import { css } from '@emotion/react';
import { pxToRem } from 'run-and-drive-lib/styles';

export const ListWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 100%;
  padding: 15px;
`;

export const AutoSizerWrapper = css`
  position: relative;
  flex: 1;
`;

export const ListHeader = css`
  font-size: ${pxToRem('40px')};
  display: block;
  height: 40px;
`;
