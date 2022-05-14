import { FC, useCallback } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { FetchErrorAlert, SkeletonLines } from 'run-and-drive-lib/components';
import { BindingCallback1 } from 'run-and-drive-lib/models';
import { stringAvatar, timeToHumanAndRelative } from 'run-and-drive-lib/utils';

import { useAppSelector } from '@redux/hooks';
import { selectAllTrips, useGetActiveTripsQuery } from '@redux/queries/trips';

import { AutoSizerWrapper, ListHeader, ListWrapper } from './styles';

interface Props {
  onTripClick: BindingCallback1<string>;
}

const ActiveTripsList: FC<Props> = ({ onTripClick }) => {
  const activeTrips = useAppSelector(selectAllTrips);
  const { isLoading: isTripsLoading, error: tripsError } = useGetActiveTripsQuery();

  const renderListElement = useCallback(
    (props: ListChildComponentProps) => {
      const { index, style } = props;
      const {
        id: tripId,
        user: { name, surname, photoUrl },
        start: { time },
      } = activeTrips[index];
      const userFullName = `${name} ${surname}`;
      const { relative } = timeToHumanAndRelative(time);

      return (
        <ListItemButton
          style={style}
          key={index}
          disableGutters
          sx={{ paddingLeft: '5px', borderRadius: '5px' }}
          onClick={() => onTripClick(tripId)}
        >
          <ListItemAvatar>
            <Avatar
              {...stringAvatar(userFullName)}
              src={photoUrl}
              sx={{ width: 40, height: 40 }}
            />
          </ListItemAvatar>
          <ListItemText primary={userFullName} secondary={`Started ${relative}`} />
        </ListItemButton>
      );
    },
    [activeTrips, onTripClick],
  );

  return (
    <Paper css={ListWrapper}>
      <Typography variant="h2" css={ListHeader}>
        Active rides:
      </Typography>
      <Box css={AutoSizerWrapper}>
        {tripsError && (
          <FetchErrorAlert title="Cannot load active trips" error={tripsError} />
        )}
        {!tripsError && isTripsLoading && <SkeletonLines linesNumber={7} height={40} />}
        {!tripsError && !isTripsLoading && !activeTrips.length && (
          <Alert variant="outlined" severity="info">
            There are no active rides right now
          </Alert>
        )}
        {!tripsError && !isTripsLoading && activeTrips.length > 0 && (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          <AutoSizer>
            {({ height, width }) => (
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              <FixedSizeList
                width={width}
                height={height}
                itemCount={activeTrips.length}
                itemSize={60}
              >
                {renderListElement}
              </FixedSizeList>
            )}
          </AutoSizer>
        )}
      </Box>
    </Paper>
  );
};

export default ActiveTripsList;
