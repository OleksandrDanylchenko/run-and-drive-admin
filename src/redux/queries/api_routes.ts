export const API = {
  SIGN_IN: `/auth/local/signin`,
  LOGOUT: `/auth/local/logout`,
  GET_USER_BY_ID: (userId: string) => `/users/${userId}`,
  GET_CAR_BY_ID: (carId: string) => `/cars/${carId}`,
  GET_ENGINEER_BY_ID: (engineerId: string) => `/engineers/${engineerId}`,
};
