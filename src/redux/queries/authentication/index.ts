import { protectedEmitterApi, publicEmitterApi } from '@redux/queries';
import { API } from '@redux/queries/api_routes';

import type { EmitterAuthData } from '@redux/slices/authentication_slice';

export const publicAuthenticationApi = publicEmitterApi.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<EmitterAuthData, RegisterPayload>({
      query: (payload) => ({
        url: API.REGISTER,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useRegisterMutation } = publicAuthenticationApi;

export const protectedAuthenticationApi = protectedEmitterApi.injectEndpoints({
  endpoints: (build) => ({
    deactivate: build.mutation<boolean, DeactivatePayload>({
      query: (payload) => ({
        url: API.DEACTIVATE,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useDeactivateMutation } = protectedAuthenticationApi;
