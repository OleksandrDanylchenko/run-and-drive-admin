import { FC } from 'react';

import Logout from '@mui/icons-material/Logout';
import MapIcon from '@mui/icons-material/Map';
import Settings from '@mui/icons-material/Settings';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useEventElement } from 'run-and-drive-lib/hooks';

import { AccountAvatar, AccountButton, HeaderTitle, HeaderToolbar } from './styles';

const Header: FC = () => {
  const { element, handleClick, handleClose } = useEventElement();
  const menuOpen = Boolean(element);

  const getAvatar = (type: 'header' | 'list') => (
    <Avatar src="/test-image" alt="Oleksandr" css={AccountAvatar} className={type} />
  );

  return (
    <AppBar position="static">
      <Toolbar css={HeaderToolbar}>
        <Typography variant="h1" css={HeaderTitle}>
          <MapIcon />
          Run & Drive
        </Typography>
        <Tooltip title="Account settings">
          <Button
            aria-controls={menuOpen ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={menuOpen ? 'true' : undefined}
            onClick={handleClick}
            css={AccountButton}
          >
            Oleksandr D.
            {getAvatar('header')}
          </Button>
        </Tooltip>
      </Toolbar>
      <Menu
        anchorEl={element}
        id="account-menu"
        open={menuOpen}
        onClose={handleClose}
        onClick={handleClose}
      >
        <MenuItem>
          <ListItemIcon>{getAvatar('list')}</ListItemIcon> My Profile
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Header;
