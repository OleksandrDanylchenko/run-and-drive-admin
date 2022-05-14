import { FC, useEffect, useState, useMemo } from 'react';

import Paper from '@mui/material/Paper';
import { GoogleMap } from 'run-and-drive-lib/components';
import { BindingCallback1 } from 'run-and-drive-lib/models';

import { GOOGLE_MAPS_KEY } from '@constants/index';
import { HOME_LOCATION } from '@constants/map';
import ActiveTripMarker from '@pages/ActiveTrips/ActiveTripsMap/ActiveTripMarker';
import { Map, MapWrapper } from '@pages/ActiveTrips/ActiveTripsMap/styles';
import { useAppSelector } from '@redux/hooks';
import { selectTripsIds } from '@redux/queries/trips';

import type { CallbackProps } from '@pages/ActiveTrips/ActiveTripsMap/ActiveTripMarker';

interface Props {
  onTripClick: BindingCallback1<string>;
}

const ActiveTripsMap: FC<Props> = ({ onTripClick }) => {
  const activeTripsIds = useAppSelector(selectTripsIds) as string[];

  const [mapInstance, setMapInstance] = useState<google.maps.Map>();
  const [followingTripId, setFollowingTripId] = useState<string>();

  useEffect(() => {
    if (!mapInstance) return;

    mapInstance.setCenter(HOME_LOCATION);
    mapInstance.setZoom(11);

    // http://bl.ocks.org/ffflabs/f4e5bd78b214ff081254
    const markersOverlay = new google.maps.OverlayView();
    markersOverlay.draw = function () {
      const panes = this.getPanes();
      if (!panes) return;

      panes.markerLayer.className = 'trip-marker';
    };
    markersOverlay.setMap(mapInstance);
  }, [mapInstance]);

  const handleMarkerClick = ({ tripId, location }: CallbackProps) => {
    onTripClick(tripId);
    setFollowingTripId(tripId);
    mapInstance?.panTo(location);
    mapInstance?.setZoom(15);
  };

  const handleMarkerLocationUpdate = ({ tripId, location }: CallbackProps) => {
    if (followingTripId !== tripId) return;
    mapInstance?.panTo(location);
  };

  const mapProps = useMemo(
    () => ({
      onDragStart: () => setFollowingTripId(undefined),
    }),
    [],
  );

  return (
    <Paper css={MapWrapper}>
      <GoogleMap
        apiKey={GOOGLE_MAPS_KEY}
        onMapLoad={setMapInstance}
        mapProps={mapProps}
        css={Map}
      >
        {mapInstance && (
          <>
            {activeTripsIds.map((tripId) => (
              <ActiveTripMarker
                key={tripId}
                tripId={tripId}
                onLocationUpdate={handleMarkerLocationUpdate}
                onTripClick={handleMarkerClick}
              />
            ))}
          </>
        )}
      </GoogleMap>
    </Paper>
  );
};

export default ActiveTripsMap;
