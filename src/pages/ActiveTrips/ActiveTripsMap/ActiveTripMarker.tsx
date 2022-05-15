import { FC, useCallback, useMemo, useEffect, memo } from 'react';

import { Marker } from '@react-google-maps/api';
import { skipToken } from '@reduxjs/toolkit/query';
import { mapsConstants } from 'run-and-drive-lib/components';
import { BindingCallback1 } from 'run-and-drive-lib/models';
import { ONE_SECOND } from 'run-and-drive-lib/utils';

import { useAppSelector } from '@redux/hooks';
import { useGetLastTripRecordQuery } from '@redux/queries/sensors';
import { selectTripById, useGetTripByIdQuery } from '@redux/queries/trips';

export type CallbackProps = { tripId: string; location: google.maps.LatLngLiteral };

interface Props {
  tripId: string;
  onLocationUpdate: BindingCallback1<CallbackProps>;
  onTripClick: BindingCallback1<CallbackProps>;
}

const ActiveTripMarker: FC<Props> = ({ tripId, onLocationUpdate, onTripClick }) => {
  const activeTrip = useAppSelector((state) => selectTripById(state, tripId));
  const { data: queryTrip } = useGetTripByIdQuery(activeTrip ? skipToken : tripId);
  const trip = activeTrip || queryTrip;

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

  useEffect(() => {
    if (!position) return;
    onLocationUpdate({ tripId, location: position });
  }, [tripId, position, onLocationUpdate]);

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
    if (!trip?.id || !position) return;
    onTripClick({ tripId: trip?.id, location: position });
  }, [onTripClick, trip?.id, position]);

  return position ? (
    <Marker
      position={position}
      icon={iconMarker}
      onClick={handleMarkerClick}
      visible={!!position}
    />
  ) : null;
};

export default memo(ActiveTripMarker);
