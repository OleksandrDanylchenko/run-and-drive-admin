import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  protectedAuthenticationApi,
  publicAuthenticationApi,
} from '@redux/queries/authentication';

export interface AuthData {
  accessToken: string;
  refreshToken: string;
  userId: string;
}

export interface AuthenticationState {
  authData?: AuthData;
}

const initialState: AuthenticationState = {
  authData: undefined,
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<AuthData>) => {
      state.authData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      publicAuthenticationApi.endpoints.signIn.matchFulfilled,
      (state, { payload }) => {
        state.authData = payload;
      },
    );
    builder.addMatcher(
      protectedAuthenticationApi.endpoints.logout.matchFulfilled,
      (state) => {
        state.authData = undefined;
      },
    );
  },
});

export default authenticationSlice.reducer;

export const { setAuthData } = authenticationSlice.actions;
