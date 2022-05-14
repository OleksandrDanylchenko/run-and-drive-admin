import { FC } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { skipToken } from '@reduxjs/toolkit/query';
import { FetchErrorAlert } from 'run-and-drive-lib/components';
import { BindingAction } from 'run-and-drive-lib/models';
import { ONE_SECOND, TEN_MINUTES } from 'run-and-drive-lib/utils';

import { CarSkeleton } from '@pages/ActiveTrips/ActiveTripsDetails/CarDetails';
import { UserSkeleton } from '@pages/ActiveTrips/ActiveTripsDetails/UserDetails';
import { useGetCarByIdQuery } from '@redux/queries/cars';
import { useGetTripByIdQuery } from '@redux/queries/trips';
import { useGetUserByIdQuery } from '@redux/queries/users';

import { CloseButton, DetailsGrid, DetailsWrapper } from './styles';

interface Props {
  tripId: string;
  onClose: BindingAction;
}

const ActiveTripsDetails: FC<Props> = ({ tripId, onClose }) => {
  const {
    data: trip,
    isLoading: isTripLoading,
    error: tripError,
  } = useGetTripByIdQuery(tripId, {
    pollingInterval: ONE_SECOND,
  });

  const {
    data: user,
    isSuccess: userLoaded,
    error: userError,
  } = useGetUserByIdQuery(trip?.user?.id || skipToken, {
    pollingInterval: TEN_MINUTES,
  });

  const {
    data: car,
    isSuccess: carLoaded,
    error: carError,
  } = useGetCarByIdQuery(trip?.car?.id || skipToken, {
    pollingInterval: TEN_MINUTES,
  });

  if (tripError) {
    return (
      <Paper css={DetailsWrapper}>
        <FetchErrorAlert title="Cannot load trip" error={tripError} />
      </Paper>
    );
  }

  return (
    <Paper css={DetailsWrapper}>
      <IconButton
        color="primary"
        aria-label="Close details section"
        onClick={onClose}
        size="large"
        css={CloseButton}
      >
        <CloseIcon fontSize="large" />
      </IconButton>
      <Grid container spacing={2} css={DetailsGrid}>
        <Grid item xs>
          {!carLoaded && <CarSkeleton />}
        </Grid>
        <Grid item xs>
          {!userLoaded && <UserSkeleton />}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ActiveTripsDetails;
