import { css } from '@emotion/react';
import { pxToRem } from 'run-and-drive-lib/styles';

export const DetailsWrapper = css`
  position: relative;
  height: 100%;
`;

export const DetailsGrid = css`
  margin-top: 0;
  padding-left: ${pxToRem('15px')};
  padding-right: ${pxToRem('15px')};
`;

export const CloseButton = css`
  position: absolute !important;
  right: 10px;
`;
