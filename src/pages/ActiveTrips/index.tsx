import { FC } from 'react';

import { FIVE_SECONDS } from 'run-and-drive-lib/utils';

import Dashboard from '@components/Dashboard';
import ActiveTripsList from '@pages/ActiveTrips/ActiveTripsList';
import { useAppSelector } from '@redux/hooks';
import { selectAllTrips, useGetActiveTripsQuery } from '@redux/queries/trips';

const ActiveTrips: FC = () => {
  const activeTrips = useAppSelector(selectAllTrips);
  const { isLoading: isTripsLoading, error: tripsError } = useGetActiveTripsQuery(
    undefined,
    {
      pollingInterval: FIVE_SECONDS,
    },
  );

  return <Dashboard sidebar={<ActiveTripsList />} map={<h2>Here will be the map</h2>} />;
};

export default ActiveTrips;
