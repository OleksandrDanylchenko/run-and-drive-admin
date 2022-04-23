import { FC } from 'react';

import MapIcon from '@mui/icons-material/Map';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { HeaderTitle, HeaderToolbar } from './styles';

const Header: FC = () => {
  return (
    <AppBar>
      <Toolbar css={HeaderToolbar}>
        <Typography variant="h1" css={HeaderTitle}>
          <MapIcon />
          Run & Drive
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
