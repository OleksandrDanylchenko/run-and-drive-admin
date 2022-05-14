import { Car } from 'run-and-drive-lib/models';

import { protectedEmitterApi } from '@redux/queries';
import { API } from '@redux/queries/api_routes';

export const carsApi = protectedEmitterApi.injectEndpoints({
  endpoints: (build) => ({
    getCarById: build.query<Car, string>({
      query: (carId) => ({
        url: API.GET_CAR_BY_ID(carId),
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetCarByIdQuery } = carsApi;
