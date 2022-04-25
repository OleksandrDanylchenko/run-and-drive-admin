import { FC, useCallback } from 'react';
import { Link } from 'react-router-dom';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { users } from './mockUsers';
import { AutoSizerWrapper, ListHeader, ListWrapper } from './styles';

const ActiveRidesList: FC = () => {
  const renderListElement = useCallback((props: ListChildComponentProps) => {
    const { index, style } = props;
    const { id, name, surname, email, photoUrl } = users[index];

    return (
      <ListItemButton
        style={style}
        key={index}
        component={Link}
        to={`/active_ride?user_id=${id}`}
      >
        <ListItemAvatar>
          <Avatar src={photoUrl} alt={name} />
        </ListItemAvatar>
        <ListItemText primary={`${name} ${surname}`} secondary={email} />
      </ListItemButton>
    );
  }, []);

  return (
    <Paper css={ListWrapper}>
      <Typography variant="h2" css={ListHeader}>
        Active rides:
      </Typography>
      <Box css={AutoSizerWrapper}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/*@ts-ignore*/}
        <AutoSizer>
          {({ height, width }) => (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <FixedSizeList
              width={width}
              height={height}
              itemCount={users.length}
              itemSize={60}
            >
              {renderListElement}
            </FixedSizeList>
          )}
        </AutoSizer>
      </Box>
    </Paper>
  );
};

export default ActiveRidesList;
