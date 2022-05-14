import { User } from 'run-and-drive-lib/models';

import { protectedEmitterApi } from '@redux/queries';
import { API } from '@redux/queries/api_routes';

export const usersApi = protectedEmitterApi.injectEndpoints({
  endpoints: (build) => ({
    getUserById: build.query<User, string>({
      query: (userId) => ({
        url: API.GET_USER_BY_ID(userId),
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserByIdQuery } = usersApi;
