import type { RootState } from '@redux/store';

export const selectCurrentTrip = (state: RootState) => state.currentTrip;

export const selectCurrentTripId = (state: RootState) =>
  selectCurrentTrip(state).currentTripId;
export const selectFollowingTripId = (state: RootState) =>
  selectCurrentTrip(state).followingTripId;
