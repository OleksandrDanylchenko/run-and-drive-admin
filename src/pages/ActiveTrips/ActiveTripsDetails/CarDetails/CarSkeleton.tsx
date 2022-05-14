import { FC } from 'react';

import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { SkeletonLines } from 'run-and-drive-lib/components';

const CarSkeleton: FC = () => (
  <Stack spacing={2}>
    <Skeleton variant="rectangular" width="96%" height={200} />
    <SkeletonLines linesNumber={10} />
  </Stack>
);

export default CarSkeleton;
