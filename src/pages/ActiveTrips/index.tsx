import { FC } from 'react';

import { ONE_SECOND } from 'run-and-drive-lib/utils';

import Dashboard from '@components/Dashboard';
import ActiveTripsList from '@pages/ActiveTrips/ActiveTripsList';
import { tripsApi } from '@redux/queries/trips';

const ActiveTrips: FC = () => {
  tripsApi.endpoints.getActiveTrips.useQuerySubscription(undefined, {
    pollingInterval: ONE_SECOND,
  });

  return <Dashboard sidebar={<ActiveTripsList />} map={<h2>Here will be the map</h2>} />;
};

export default ActiveTrips;
