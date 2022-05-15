import { FC } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { FetchErrorAlert } from 'run-and-drive-lib/components';
import { BindingAction } from 'run-and-drive-lib/models';
import { ONE_SECOND } from 'run-and-drive-lib/utils';

import CarDetails from '@pages/ActiveTrips/ActiveTripsDetails/CarDetails';
import TripDetails from '@pages/ActiveTrips/ActiveTripsDetails/TripDetails';
import UserDetails from '@pages/ActiveTrips/ActiveTripsDetails/UserDetails';
import { useGetTripByIdQuery } from '@redux/queries/trips';

import { CloseButton, DetailsGrid, DetailsGridItem, DetailsWrapper } from './styles';

interface Props {
  tripId: string;
  onClose: BindingAction;
}

const ActiveTripsDetails: FC<Props> = ({ tripId, onClose }) => {
  const { data: trip, error: tripError } = useGetTripByIdQuery(tripId, {
    pollingInterval: ONE_SECOND,
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
        <Grid item xs css={DetailsGridItem}>
          <TripDetails tripId={tripId} />
          <UserDetails userId={trip?.user?.id} />
        </Grid>
        <Grid item xs css={DetailsGridItem}>
          <CarDetails carId={trip?.car?.id} tripId={tripId} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ActiveTripsDetails;
