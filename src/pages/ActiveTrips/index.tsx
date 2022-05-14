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
  const [followingTripId, setFollowingTripId] = useState<string>();

  const handleTripClick = (tripId: string) => {
    setDetailsTripId(tripId);
    setFollowingTripId(tripId);
  };
  const handleMapDrag = () => {
    setFollowingTripId(undefined);
  };

  const handleDetailsClose = () => {
    setDetailsTripId(undefined);
  };

  return (
    <Dashboard
      sidebar={<ActiveTripsList onTripClick={handleTripClick} />}
      map={
        <ActiveTripsMap
          onTripClick={handleTripClick}
          followingTripId={followingTripId}
          onMapDrag={handleMapDrag}
        />
      }
      info={
        detailsTripId && (
          <ActiveTripsDetails tripId={detailsTripId} onClose={handleDetailsClose} />
        )
      }
    />
  );
};

export default ActiveTrips;
