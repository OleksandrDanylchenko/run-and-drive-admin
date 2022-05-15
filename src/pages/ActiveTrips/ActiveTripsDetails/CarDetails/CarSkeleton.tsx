import { FC } from 'react';

import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { SkeletonLines } from 'run-and-drive-lib/components';

const CarSkeleton: FC = () => (
  <Stack spacing={2} sx={{ padding: '20px' }}>
    <SkeletonLines linesNumber={4} />
    <Skeleton variant="rectangular" width="96%" height={300} />
    <SkeletonLines linesNumber={2} />
  </Stack>
);

export default CarSkeleton;
