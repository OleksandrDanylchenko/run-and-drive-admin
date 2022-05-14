export const API = {
  SIGN_IN: `/auth/local/signin`,
  REFRESH_TOKEN: `/auth/refresh`,
  LOGOUT: `/auth/local/logout`,
  GET_USER_BY_ID: (userId: string) => `/users/${userId}`,
  GET_CAR_BY_ID: (carId: string) => `/cars/${carId}`,
  GET_TRIPS: `/trips`,
  GET_TRIP_BY_ID: (tripId: string) => `/trips/${tripId}`,
  GET_LAST_TRIP_RECORD: (tripId: string) => `/sensors/trip/${tripId}/last`,
};
