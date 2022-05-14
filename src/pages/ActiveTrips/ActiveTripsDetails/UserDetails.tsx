import { FC } from 'react';

import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { skipToken } from '@reduxjs/toolkit/query';
import { SkeletonLines, FetchErrorAlert } from 'run-and-drive-lib/components';
import { TEN_MINUTES } from 'run-and-drive-lib/utils';

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

const UserSkeleton: FC = () => (
  <Stack spacing={2}>
    <Stack direction="row" alignItems="center" spacing={2}>
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton width="80%" />
    </Stack>
    <SkeletonLines linesNumber={10} />
  </Stack>
);

export default UserDetails;
