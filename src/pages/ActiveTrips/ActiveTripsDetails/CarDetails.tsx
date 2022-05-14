import { FC } from 'react';

import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { skipToken } from '@reduxjs/toolkit/query';
import { SkeletonLines, FetchErrorAlert } from 'run-and-drive-lib/components';
import { TEN_MINUTES } from 'run-and-drive-lib/utils';

import { useGetCarByIdQuery } from '@redux/queries/cars';

interface Props {
  carId?: string;
}

const CarDetails: FC<Props> = ({ carId }) => {
  const {
    data: car,
    isSuccess: carLoaded,
    error: carError,
  } = useGetCarByIdQuery(carId || skipToken, {
    pollingInterval: TEN_MINUTES,
  });

  if (!carLoaded) return <CarSkeleton />;
  if (carError) return <FetchErrorAlert title="Cannot load car" error={carError} />;

  return <Stack>Hello!</Stack>;
};

const CarSkeleton: FC = () => (
  <Stack spacing={2}>
    <Skeleton variant="rectangular" width="100%" height={200} />
    <SkeletonLines linesNumber={5} />
  </Stack>
);

export default CarDetails;
