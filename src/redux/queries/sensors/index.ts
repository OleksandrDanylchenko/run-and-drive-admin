import { SensorsRecord } from 'run-and-drive-lib/models';

import { protectedEmitterApi } from '@redux/queries';
import { API } from '@redux/queries/api_routes';

export const sensorsApi = protectedEmitterApi.injectEndpoints({
  endpoints: (build) => ({
    getLastTripRecord: build.query<SensorsRecord, string>({
      query: (tripId) => ({
        url: API.GET_LAST_TRIP_RECORD(tripId),
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetLastTripRecordQuery } = sensorsApi;
