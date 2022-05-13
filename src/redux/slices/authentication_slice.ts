import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  publicAuthenticationApi,
  protectedAuthenticationApi,
} from '@redux/queries/authentication';

export interface EmitterAuthData {
  accessToken: string;
  emitterId: string;
  engineerId: string;
  carId: string;
  activatedAt: string;
}

export interface AuthenticationState {
  authData?: EmitterAuthData;
}

const initialState: AuthenticationState = {
  authData: undefined,
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<EmitterAuthData>) => {
      state.authData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      publicAuthenticationApi.endpoints.register.matchFulfilled,
      (state, { payload }) => {
        state.authData = payload;
      },
    );
    builder.addMatcher(
      protectedAuthenticationApi.endpoints.deactivate.matchFulfilled,
      (state, { payload }) => {
        state.authData = undefined;
      },
    );
  },
});

export default authenticationSlice.reducer;

export const { setAuthData } = authenticationSlice.actions;
