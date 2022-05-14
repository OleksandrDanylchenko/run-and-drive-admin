import { FC, useMemo } from 'react';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';
import MapIcon from '@mui/icons-material/Map';
import LoadingButton from '@mui/lab/LoadingButton';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEventElement } from 'run-and-drive-lib/hooks';
import { isEmpty, stringAvatar } from 'run-and-drive-lib/utils';

import { useAppSelector } from '@redux/hooks';
import { useGetUserByIdQuery } from '@redux/queries/authentication';
import { selectUserId } from '@redux/selectors/authentication_selectors';

import { AccountButton, HeaderTitle, HeaderToolbar } from './styles';

const Header: FC = () => {
  const { element, handleClick, handleClose } = useEventElement();
  const menuOpen = Boolean(element);

  const userId = useAppSelector(selectUserId);
  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
  } = useGetUserByIdQuery(userId || skipToken);

  const profileElement = useMemo(() => {
    if (!user) return null;

    const { name, surname, photoUrl } = user;
    const fullName = `${name} ${surname}`;

    return (
      <>
        <Avatar
          {...stringAvatar(fullName)}
          src={photoUrl}
          sx={{ width: 35, height: 35 }}
        />
        {name} {surname[0]}.
      </>
    );
  }, [user]);

  return (
    <AppBar position="static">
      <Toolbar css={HeaderToolbar}>
        <Typography variant="h1" css={HeaderTitle}>
          <MapIcon />
          Run & Drive
        </Typography>
        <Tooltip title="Account settings">
          <LoadingButton
            aria-controls={menuOpen ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={menuOpen ? 'true' : undefined}
            onClick={handleClick}
            disabled={!isEmpty(userError)}
            loading={isUserLoading}
            loadingPosition="end"
            css={AccountButton}
          >
            {profileElement}
          </LoadingButton>
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
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          My Profile
        </MenuItem>
        <Divider />
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
