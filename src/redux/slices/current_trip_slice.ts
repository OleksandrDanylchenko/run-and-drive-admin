import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
});

export default currentTripSlice.reducer;

export const { setCurrentTripId, setFollowingTripId } = currentTripSlice.actions;
