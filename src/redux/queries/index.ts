import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import { API_HOST } from '@constants/index';
import { API } from '@redux/queries/api_routes';
import {
  selectAccessToken,
  selectRefreshToken,
} from '@redux/selectors/authentication_selectors';
import { logout, setAuthData } from '@redux/slices/authentication_actions';

import type { AuthData } from '@redux/slices/authentication_slice';
import type { RootState } from '@redux/store';

const publicBaseQuery = fetchBaseQuery({ baseUrl: API_HOST });

export const publicEmitterApi = createApi({
  reducerPath: 'publicEmitterApi',
  baseQuery: publicBaseQuery,
  endpoints: () => ({}),
});

const accessTokenQuery = fetchBaseQuery({
  baseUrl: API_HOST,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = selectAccessToken(getState() as RootState);
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const refreshTokenQuery = fetchBaseQuery({
  baseUrl: API_HOST,
  prepareHeaders: (headers, { getState }) => {
    const refreshToken = selectRefreshToken(getState() as RootState);
    if (refreshToken) {
      headers.set('Authorization', `Bearer ${refreshToken}`);
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

  let result = await accessTokenQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = (await refreshTokenQuery(
      {
        url: API.REFRESH_TOKEN,
        method: 'POST',
      },
      api,
      extraOptions,
    )) as { data: AuthData };
    if (refreshResult.data) {
      api.dispatch(setAuthData(refreshResult.data));
      result = await accessTokenQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const protectedEmitterApi = createApi({
  reducerPath: 'protectedEmitterApi',
  baseQuery: protectedBaseQuery,
  endpoints: () => ({}),
});
