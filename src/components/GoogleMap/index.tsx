import { FC, useCallback, useMemo, useState, memo } from 'react';

import Paper from '@mui/material/Paper';
import { useLoadScript, GoogleMap as GoogleMapLib } from '@react-google-maps/api';

import { MapWrapper, GoogleMapContainer } from '@components/GoogleMap/styles';

const center = {
  lat: 50.450001,
  lng: 30.523333,
};

const GoogleMap: FC = () => {
  const { isLoaded, loadError } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: 'gg',
  });

  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMapInstance(map);
  }, []);

  const onMapUnmount = useCallback(() => setMapInstance(null), []);

  const mapElement = useMemo(() => {
    if (loadError) {
      return <h2>Error loading of the map</h2>;
    }

    return isLoaded ? (
      <GoogleMapLib
        mapContainerStyle={GoogleMapContainer}
        center={center}
        zoom={11}
        onLoad={onMapLoad}
        onUnmount={onMapUnmount}
      >
        <></>
      </GoogleMapLib>
    ) : (
      <></>
    );
  }, [isLoaded, loadError, onMapLoad, onMapUnmount]);

  return <Paper css={MapWrapper}>{mapElement}</Paper>;
};

export default memo(GoogleMap);
