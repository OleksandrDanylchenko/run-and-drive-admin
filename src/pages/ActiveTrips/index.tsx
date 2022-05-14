import { FC, useState } from 'react';

import { ONE_SECOND } from 'run-and-drive-lib/utils';

import Dashboard from '@components/Dashboard';
import ActiveTripsDetails from '@pages/ActiveTrips/ActiveTripsDetails';
import ActiveTripsList from '@pages/ActiveTrips/ActiveTripsList';
import ActiveTripsMap from '@pages/ActiveTrips/ActiveTripsMap';
import { tripsApi } from '@redux/queries/trips';

const ActiveTrips: FC = () => {
  tripsApi.endpoints.getActiveTrips.useQuerySubscription(undefined, {
    pollingInterval: ONE_SECOND,
  });

  const [detailsTripId, setDetailsTripId] = useState<string>();
  const handleTripClick = (tripId: string) => {
    if (detailsTripId === tripId) return;
    setDetailsTripId(tripId);
  };

  return (
    <Dashboard
      sidebar={<ActiveTripsList onTripClick={handleTripClick} />}
      map={<ActiveTripsMap onTripClick={handleTripClick} />}
      info={detailsTripId && <ActiveTripsDetails tripId={detailsTripId} />}
    />
  );
};

export default ActiveTrips;
