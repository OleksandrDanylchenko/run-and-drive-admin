import { createEntityAdapter, createSelector, EntityState } from '@reduxjs/toolkit';
import { Trip, TripState } from 'run-and-drive-lib/models';

import { protectedEmitterApi } from '@redux/queries';
import { API } from '@redux/queries/api_routes';

import type { RootState } from '@redux/store';

export const tripsAdapter = createEntityAdapter<Trip>();
export const tripsInitialState = tripsAdapter.getInitialState();

export const transformTrips = (response: unknown): EntityState<Trip> => {
  const trips = response as Trip[];
  return tripsAdapter.setMany(tripsInitialState, trips);
};

export const tripsApi = protectedEmitterApi.injectEndpoints({
  endpoints: (build) => ({
    getActiveTrips: build.query<EntityState<Trip>, void>({
      query: () => ({
        url: API.GET_TRIPS,
        params: {
          state: TripState.IN_PROGRESS,
        },
      }),
      transformResponse: transformTrips,
    }),
    getTripById: build.query<Trip, string>({
      query: (tripId) => ({
        url: API.GET_TRIP_BY_ID(tripId),
      }),
    }),
  }),
  overrideExisting: false,
});

export const selectTripsResult = createSelector([], () =>
  tripsApi.endpoints.getActiveTrips.select(),
);

const selectTripsData = createSelector(
  [(state) => selectTripsResult(state)(state)],
  (trips) => trips.data,
);

export const {
  selectAll: selectAllTrips,
  selectById: selectTripById,
  selectIds: selectTripsIds,
  selectEntities: selectTripsEntities,
} = tripsAdapter.getSelectors(
  (state: RootState) => selectTripsData(state) || tripsInitialState,
);

export const { useGetActiveTripsQuery, useGetTripByIdQuery } = tripsApi;
