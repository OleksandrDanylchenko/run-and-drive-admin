import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import { API_HOST } from '@constants/index';

import type { RootState } from '@redux/store';

const publicBaseQuery = fetchBaseQuery({ baseUrl: API_HOST });

export const publicEmitterApi = createApi({
  reducerPath: 'publicEmitterApi',
  baseQuery: publicBaseQuery,
  endpoints: () => ({}),
});

const bearerBaseQuery = fetchBaseQuery({
  baseUrl: API_HOST,
  prepareHeaders: (headers, { getState }) => {
    const { authData } = (getState() as RootState).authentication;
    if (authData?.accessToken) {
      headers.set('Authorization', `Bearer ${authData.accessToken}`);
    }
    return headers;
  },
});
const protectedBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const state = api.getState() as RootState;
  const { authData } = state.authentication;
  if (!authData?.accessToken) {
    console.error(
      'Access token is missing!',
      `Failed on request to ${JSON.stringify(args, null, 2)}`,
    );
    window.location.replace('/error/token-missing');
  }
  return bearerBaseQuery(args, api, extraOptions);
};

export const protectedEmitterApi = createApi({
  reducerPath: 'protectedEmitterApi',
  baseQuery: protectedBaseQuery,
  endpoints: () => ({}),
});
