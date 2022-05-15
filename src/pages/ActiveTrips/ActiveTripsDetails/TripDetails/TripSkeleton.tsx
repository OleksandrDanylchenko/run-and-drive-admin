import { FC } from 'react';

import Stack from '@mui/material/Stack';
import { SkeletonLines } from 'run-and-drive-lib/components';

const TripSkeleton: FC = () => (
  <Stack spacing={2} sx={{ padding: '20px' }}>
    <SkeletonLines linesNumber={5} />
  </Stack>
);

export default TripSkeleton;
