import {
  AnyAction,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { rtkQueryErrorLogger } from 'run-and-drive-lib/redux';

import { protectedEmitterApi, publicEmitterApi } from '@redux/queries';

import authenticationReducer from './slices/authentication_slice';
import currentTripReducer from './slices/current_trip_slice';

const reducers = combineReducers({
  authentication: authenticationReducer,
  currentTrip: currentTripReducer,
  [publicEmitterApi.reducerPath]: publicEmitterApi.reducer,
  [protectedEmitterApi.reducerPath]: protectedEmitterApi.reducer,
});

const persistedReducer = persistReducer(
  {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['authentication', 'currentTrip'],
  },
  reducers,
);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(publicEmitterApi.middleware)
      .concat(protectedEmitterApi.middleware)
      .concat(rtkQueryErrorLogger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
export type AppThunkApi = {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: FetchBaseQueryError;
};

export const persistor = persistStore(store);
