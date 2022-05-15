import { FC, memo } from 'react';
import { Carousel } from 'react-responsive-carousel';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import Stack from '@mui/material/Stack';
import { skipToken } from '@reduxjs/toolkit/query';
import { FetchErrorAlert } from 'run-and-drive-lib/components';
import { TEN_MINUTES } from 'run-and-drive-lib/utils';

import CarSkeleton from '@pages/ActiveTrips/ActiveTripsDetails/CarDetails/CarSkeleton';
import CharacteristicsCard from '@pages/ActiveTrips/ActiveTripsDetails/CarDetails/CharacteristicsCard';
import IndicatorsCard from '@pages/ActiveTrips/ActiveTripsDetails/CarDetails/IndicatorsCard';
import { useGetCarByIdQuery } from '@redux/queries/cars';

interface Props {
  carId?: string;
  tripId: string;
}

const CarDetails: FC<Props> = ({ carId, tripId }) => {
  const {
    data: car,
    isSuccess: carLoaded,
    error: carError,
  } = useGetCarByIdQuery(carId || skipToken, {
    pollingInterval: TEN_MINUTES,
  });

  if (carError) return <FetchErrorAlert title="Cannot load car" error={carError} />;
  if (!car || !carLoaded) return <CarSkeleton />;

  const { brand, model, year, photosUrls } = car;

  return (
    <Stack spacing={3}>
      <IndicatorsCard car={car} tripId={tripId} />
      {photosUrls.length > 0 && (
        <Carousel
          ariaLabel={`${brand} ${model}, ${year}`}
          infiniteLoop
          emulateTouch
          showThumbs={false}
        >
          {photosUrls.map((url) => (
            <div key={url}>
              <img src={url} alt="" />
            </div>
          ))}
        </Carousel>
      )}
      <CharacteristicsCard car={car} />
    </Stack>
  );
};

export default memo(CarDetails);
