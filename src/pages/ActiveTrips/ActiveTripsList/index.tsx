import { FC, useCallback } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { SkeletonLines } from 'run-and-drive-lib/components';
import { getErrorMessage } from 'run-and-drive-lib/redux';
import { stringAvatar, timeToHumanAndRelative } from 'run-and-drive-lib/utils';

import { useAppSelector } from '@redux/hooks';
import { selectAllTrips, useGetActiveTripsQuery } from '@redux/queries/trips';

import { AutoSizerWrapper, ListHeader, ListWrapper } from './styles';

const ActiveTripsList: FC = () => {
  const activeTrips = useAppSelector(selectAllTrips);
  const { isLoading: isTripsLoading, error: tripsError } = useGetActiveTripsQuery();

  const renderListElement = useCallback(
    (props: ListChildComponentProps) => {
      const { index, style } = props;
      const {
        car: { model, brand, year, photosUrls },
        start: { time },
      } = activeTrips[index];
      const carFullName = `${model} ${brand}, ${year}`;
      const { relative } = timeToHumanAndRelative(time);

      return (
        <ListItemButton style={style} key={index} disableGutters>
          <ListItemAvatar>
            <Avatar
              {...stringAvatar(carFullName)}
              src={photosUrls[0]}
              sx={{ width: 24, height: 24 }}
            />
          </ListItemAvatar>
          <ListItemText primary={carFullName} secondary={`Started ${relative}`} />
        </ListItemButton>
      );
    },
    [activeTrips],
  );

  return (
    <Paper css={ListWrapper}>
      <Typography variant="h2" css={ListHeader}>
        Active rides:
      </Typography>
      <Box css={AutoSizerWrapper}>
        {tripsError && (
          <Alert severity="error">
            <AlertTitle>Cannot load active trips</AlertTitle>
            {getErrorMessage(tripsError)}
          </Alert>
        )}
        {!tripsError && isTripsLoading && <SkeletonLines linesNumber={7} />}
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
                itemSize={40}
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
