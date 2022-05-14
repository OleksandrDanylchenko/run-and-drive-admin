import { FC, useMemo } from 'react';

import { Marker } from '@react-google-maps/api';
import { mapsConstants } from 'run-and-drive-lib/components';
import { ONE_SECOND } from 'run-and-drive-lib/utils';

import { useAppSelector } from '@redux/hooks';
import { useGetLastTripRecordQuery } from '@redux/queries/sensors';
import { selectTripById } from '@redux/queries/trips';

interface Props {
  tripId: string;
}

const TripMarker: FC<Props> = ({ tripId }) => {
  const trip = useAppSelector((state) => selectTripById(state, tripId));
  const { data: lastRecord } = useGetLastTripRecordQuery(tripId, {
    pollingInterval: ONE_SECOND,
  });

  const position = useMemo(() => {
    if (lastRecord) {
      return lastRecord.location;
    }
    if (trip) {
      return trip.start.location;
    }
    return null;
  }, [lastRecord, trip]);

  const iconMarker = useMemo(() => {
    if (!trip) return;
    const { markerSize, endMarkerUrl } = mapsConstants;

    const {
      user: { photoUrl },
    } = trip;
    return {
      url: photoUrl ?? endMarkerUrl,
      scaledSize: new google.maps.Size(markerSize, markerSize),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(markerSize / 2, markerSize / 2),
      optimized: false,
    };
  }, [trip]);

  return position ? <Marker position={position} icon={iconMarker} /> : null;
};

export default TripMarker;
