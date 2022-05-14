import { FC, useState, useEffect } from 'react';

import Paper from '@mui/material/Paper';
import { GoogleMap } from 'run-and-drive-lib/components';
import { BindingCallback1 } from 'run-and-drive-lib/models';

import { GOOGLE_MAPS_KEY } from '@constants/index';
import { HOME_LOCATION } from '@constants/map';
import ActiveTripMarker from '@pages/ActiveTrips/ActiveTripsMap/ActiveTripMarker';
import { Map, MapWrapper } from '@pages/ActiveTrips/ActiveTripsMap/styles';
import { useAppSelector } from '@redux/hooks';
import { selectAllTrips } from '@redux/queries/trips';

interface Props {
  onTripClick: BindingCallback1<string>;
}

const ActiveTripsMap: FC<Props> = ({ onTripClick }) => {
  const activeTrips = useAppSelector(selectAllTrips);

  const [mapInstance, setMapInstance] = useState<google.maps.Map>();

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

  return (
    <Paper css={MapWrapper}>
      <GoogleMap apiKey={GOOGLE_MAPS_KEY} onMapLoad={setMapInstance} css={Map}>
        {mapInstance && (
          <>
            {activeTrips.map(({ id: tripId }) => (
              <ActiveTripMarker key={tripId} tripId={tripId} onTripClick={onTripClick} />
            ))}
          </>
        )}
      </GoogleMap>
    </Paper>
  );
};

export default ActiveTripsMap;
