import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';
import { createRoot } from 'react-dom/client';

import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { styles } from 'run-and-drive-lib';

import Routing from '@navigation/Routing';

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={styles.theme}>
        <CssBaseline enableColorScheme />
        <Routing />
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
);
