import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { protectedAuthenticationApi } from '@redux/queries/authentication';

export interface CurrentTripState {
  currentTripId?: string;
  followingTripId?: string;
}

const initialState: CurrentTripState = {
  currentTripId: undefined,
  followingTripId: undefined,
};

const currentTripSlice = createSlice({
  name: 'currentTrip',
  initialState,
  reducers: {
    setCurrentTripId: (state, action: PayloadAction<string | undefined>) => {
      state.currentTripId = action.payload;
    },
    setFollowingTripId: (state, action: PayloadAction<string | undefined>) => {
      state.followingTripId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      protectedAuthenticationApi.endpoints.logout.matchFulfilled,
      (state) => {
        state.currentTripId = undefined;
        state.followingTripId = undefined;
      },
    );
  },
});

export default currentTripSlice.reducer;

export const { setCurrentTripId, setFollowingTripId } = currentTripSlice.actions;
