import { htmlFontSize } from '@styles/constants';

export const pxToRem = (px: string) => `${parseFloat(px) / parseFloat(htmlFontSize)}rem`;
