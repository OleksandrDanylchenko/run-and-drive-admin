/* eslint-disable import/no-cycle */

import { User } from 'run-and-drive-lib/models';

import { SignInPayload } from '@models/api';
import { protectedEmitterApi, publicEmitterApi } from '@redux/queries';
import { API } from '@redux/queries/api_routes';

import type { AuthData } from '@redux/slices/authentication_slice';

export const publicAuthenticationApi = publicEmitterApi.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation<AuthData, SignInPayload>({
      query: (payload) => ({
        url: API.SIGN_IN,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useSignInMutation } = publicAuthenticationApi;

export const protectedAuthenticationApi = protectedEmitterApi.injectEndpoints({
  endpoints: (build) => ({
    logout: build.mutation<boolean, void>({
      query: () => ({
        url: API.LOGOUT,
        method: 'POST',
      }),
    }),
    getUserById: build.query<User, string>({
      query: (userId) => ({
        url: API.GET_USER_BY_ID(userId),
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLogoutMutation, useGetUserByIdQuery } = protectedAuthenticationApi;
