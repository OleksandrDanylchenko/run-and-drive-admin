import { FC, useCallback, useMemo } from 'react';

import { Marker } from '@react-google-maps/api';
import { mapsConstants } from 'run-and-drive-lib/components';
import { BindingCallback1 } from 'run-and-drive-lib/models';
import { ONE_SECOND } from 'run-and-drive-lib/utils';

import { useAppSelector } from '@redux/hooks';
import { useGetLastTripRecordQuery } from '@redux/queries/sensors';
import { selectTripById } from '@redux/queries/trips';

interface Props {
  tripId: string;
  onTripClick: BindingCallback1<string>;
}

const ActiveTripMarker: FC<Props> = ({ tripId, onTripClick }) => {
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

  const handleMarkerClick = useCallback(() => {
    if (!trip?.id) return;
    onTripClick(trip?.id);
  }, [onTripClick, trip?.id]);

  return position ? (
    <Marker position={position} icon={iconMarker} onClick={handleMarkerClick} />
  ) : null;
};

export default ActiveTripMarker;
