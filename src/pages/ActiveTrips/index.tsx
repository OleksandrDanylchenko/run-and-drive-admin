import { FC, useState } from 'react';

import { ONE_SECOND } from 'run-and-drive-lib/utils';

import Dashboard from '@components/Dashboard';
import ActiveTripsDetails from '@pages/ActiveTrips/ActiveTripsDetails';
import ActiveTripsList from '@pages/ActiveTrips/ActiveTripsList';
import ActiveTripsMap from '@pages/ActiveTrips/ActiveTripsMap';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { tripsApi } from '@redux/queries/trips';
import {
  selectCurrentTripId,
  selectFollowingTripId,
} from '@redux/selectors/current_trip_selectors';
import { setCurrentTripId, setFollowingTripId } from '@redux/slices/current_trip_slice';

const ActiveTrips: FC = () => {
  const dispatch = useAppDispatch();

  const currentTripId = useAppSelector(selectCurrentTripId);
  const followingTripId = useAppSelector(selectFollowingTripId);

  tripsApi.endpoints.getActiveTrips.useQuerySubscription(undefined, {
    pollingInterval: ONE_SECOND,
  });

  const handleTripClick = (tripId: string) => {
    dispatch(setCurrentTripId(tripId));
    dispatch(setFollowingTripId(tripId));
  };
  const handleMapDrag = () => {
    dispatch(setFollowingTripId(undefined));
  };

  const handleDetailsClose = () => {
    dispatch(setCurrentTripId(undefined));
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
        currentTripId && (
          <ActiveTripsDetails tripId={currentTripId} onClose={handleDetailsClose} />
        )
      }
    />
  );
};

export default ActiveTrips;
