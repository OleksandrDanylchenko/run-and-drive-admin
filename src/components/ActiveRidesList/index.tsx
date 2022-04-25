import { FC, useCallback } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

import ImageIcon from '@mui/icons-material/Image';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { AutoSizerWrapper, ListHeader, ListWrapper } from './styles';

const ActiveRidesList: FC = () => {
  const renderListElement = useCallback((props: ListChildComponentProps) => {
    const { index, style } = props;

    return (
      <ListItem style={style} key={index} component="div" disableGutters>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={`Item ${index}`} />
      </ListItem>
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
            <FixedSizeList width={width} height={height} itemCount={20} itemSize={60}>
              {renderListElement}
            </FixedSizeList>
          )}
        </AutoSizer>
      </Box>
    </Paper>
  );
};

export default ActiveRidesList;
