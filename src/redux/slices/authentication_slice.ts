import { createSlice } from '@reduxjs/toolkit';

import {
  protectedAuthenticationApi,
  publicAuthenticationApi,
} from '@redux/queries/authentication';
import { logout, setAuthData } from '@redux/slices/authentication_actions';

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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setAuthData, (state, action) => {
      state.authData = action.payload;
    });
    builder.addCase(logout, (state) => {
      state.authData = undefined;
    });
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
