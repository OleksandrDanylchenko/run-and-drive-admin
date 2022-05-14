import { createAction } from '@reduxjs/toolkit';

import type { AuthData } from '@redux/slices/authentication_slice';

export const setAuthData = createAction<AuthData>('authentication/setAuthData');
export const logout = createAction('authentication/logout');
