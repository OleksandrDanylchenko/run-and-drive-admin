/// <reference types="vite/client" />

import { Theme as MaterialUITheme } from '@mui/material';

declare module '@emotion/react' {
  // eslint-disable-next-line
  interface Theme extends MaterialUITheme {}
}
