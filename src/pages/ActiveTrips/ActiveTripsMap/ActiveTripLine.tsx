import { FC, memo, useMemo } from 'react';

import { useTheme } from '@mui/material';
import { Marker, Polyline } from '@react-google-maps/api';
import { mapsConstants } from 'run-and-drive-lib/components';

import { useGetAllTripRecordsQuery } from '@redux/queries/sensors';

interface Props {
  tripId: string;
}

const ActiveTripLine: FC<Props> = ({ tripId }) => {
  const { data: records, isSuccess: recordsLoaded } = useGetAllTripRecordsQuery(tripId, {
    selectFromResult: (result) => ({
      ...result,
      data: result.data?.map(({ location }) => location) || [],
    }),
  });

  const theme = useTheme();

  const markerIcon = useMemo(() => {
    const { markerSize, startMarkerUrl } = mapsConstants;
    return {
      url: startMarkerUrl,
      scaledSize: new google.maps.Size(markerSize, markerSize),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(markerSize / 2, markerSize),
    };
  }, []);

  return recordsLoaded ? (
    <>
      {records[0] && <Marker position={records[0]} icon={markerIcon} />}
      <Polyline path={records} options={{ strokeColor: theme.palette.info.main }} />
    </>
  ) : null;
};

export default memo(ActiveTripLine);
