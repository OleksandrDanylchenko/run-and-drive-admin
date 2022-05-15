import { FC } from 'react';

import Stack from '@mui/material/Stack';
import { skipToken } from '@reduxjs/toolkit/query';
import { FetchErrorAlert } from 'run-and-drive-lib/components';
import { TEN_MINUTES } from 'run-and-drive-lib/utils';

import UserSkeleton from '@pages/ActiveTrips/ActiveTripsDetails/UserDetails/UserSkeleton';
import { useGetUserByIdQuery } from '@redux/queries/users';

interface Props {
  userId?: string;
}

const UserDetails: FC<Props> = ({ userId }) => {
  const {
    data: user,
    isSuccess: userLoaded,
    error: userError,
  } = useGetUserByIdQuery(userId || skipToken, {
    pollingInterval: TEN_MINUTES,
  });

  if (userError) return <FetchErrorAlert title="Cannot load user" error={userError} />;
  if (!user || !userLoaded) return <UserSkeleton />;

  return <Stack>Hello user!</Stack>;
};

export default UserDetails;
