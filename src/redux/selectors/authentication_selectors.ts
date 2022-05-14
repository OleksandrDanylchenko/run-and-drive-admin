import type { RootState } from '@redux/store';

export const selectAuthentication = (state: RootState) => state.authentication;

export const selectAuthData = (state: RootState) => selectAuthentication(state).authData;
export const selectAccessToken = (state: RootState) => selectAuthData(state)?.accessToken;
export const selectRefreshToken = (state: RootState) =>
  selectAuthData(state)?.refreshToken;
export const selectUserId = (state: RootState) => selectAuthData(state)?.userId;
