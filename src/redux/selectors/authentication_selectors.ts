import type { RootState } from '@redux/store';

export const selectAuthentication = (state: RootState) => state.authentication;

export const selectAuthData = (state: RootState) => selectAuthentication(state).authData;
