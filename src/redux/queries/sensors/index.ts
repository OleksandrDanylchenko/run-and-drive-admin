import { SensorsRecord } from 'run-and-drive-lib/models';

import { protectedEmitterApi } from '@redux/queries';
import { API } from '@redux/queries/api_routes';

export const sensorsApi = protectedEmitterApi.injectEndpoints({
  endpoints: (build) => ({
    getLastTripRecord: build.query<SensorsRecord, string>({
      query: (tripId) => ({
        url: API.GET_LAST_TRIP_RECORD(tripId),
      }),
      async onQueryStarted(tripId, { dispatch, queryFulfilled }) {
        try {
          const { data: sensorsRecord } = await queryFulfilled;
          dispatch(
            sensorsApi.util.updateQueryData(
              'getAllTripRecords',
              tripId,
              (draftSensorsRecords) => {
                draftSensorsRecords?.push(sensorsRecord);
              },
            ),
          );
        } catch (error) {
          console.error(error);
        }
      },
    }),
    getAllTripRecords: build.query<SensorsRecord[], string>({
      query: (tripId) => ({
        url: API.GET_ALL_TRIP_RECORDS(tripId),
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetLastTripRecordQuery, useGetAllTripRecordsQuery } = sensorsApi;
