import { FC } from 'react';

import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { SkeletonLines } from 'run-and-drive-lib/components';

export const UserSkeleton: FC = () => (
  <Stack spacing={2}>
    <Stack direction="row" alignItems="center" spacing={2}>
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton width="80%" />
    </Stack>
    <SkeletonLines linesNumber={10} />
  </Stack>
);
