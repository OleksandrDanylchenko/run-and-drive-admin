import { FC, memo, useMemo } from 'react';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import MapIcon from '@mui/icons-material/Map';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import humanizeDuration from 'humanize-duration';
import { DateTime, Interval } from 'luxon';
import { TableRowData, Trip } from 'run-and-drive-lib/models';
import { timeToHumanAndRelative } from 'run-and-drive-lib/utils';

import TripSkeleton from '@pages/ActiveTrips/ActiveTripsDetails/TripDetails/TripSkeleton';
import { useGetTripByIdQuery } from '@redux/queries/trips';

interface Props {
  tripId: string;
}

const TripDetails: FC<Props> = ({ tripId }) => {
  const { data: trip, isSuccess: tripLoaded } = useGetTripByIdQuery(tripId);

  if (!trip || !tripLoaded) return <TripSkeleton />;
  return (
    <Card>
      <CardHeader
        title={
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h5">Trip details</Typography>
            <MapIcon />
          </Stack>
        }
      />
      <CardContent>
        <TripDetailsTable trip={trip} />
      </CardContent>
    </Card>
  );
};

const TripDetailsTable: FC<{ trip: Trip }> = ({ trip }) => {
  const tableRows = useMemo<TableRowData[]>(() => {
    const {
      start: { location: startLocation, time: startTime },
      end,
      totalDistance,
    } = trip;

    const { localeString: startLocaleString, relative: startRelative } =
      timeToHumanAndRelative(startTime);

    const rows: TableRowData[] = [];

    rows.push({
      label: 'Status',
      value: <strong>{end ? 'Ended' : 'In progress'}</strong>,
    });

    rows.push({
      label: 'Current location',
      value: formatLocation(startLocation),
    });

    rows.push({
      label: 'Started at',
      value: (
        <Stack spacing={1}>
          <span>
            {startLocaleString} ({startRelative})
          </span>
          <span>{formatLocation(startLocation)}</span>
        </Stack>
      ),
    });

    if (end) {
      const { location: endLocation, time: endTime } = end;
      const { localeString: endLocaleString, relative: endRelative } =
        timeToHumanAndRelative(endTime);

      rows.push({
        label: 'Ended at',
        value: (
          <Stack spacing={1}>
            <span>
              {endLocaleString} ({endRelative})
            </span>
            <span>{formatLocation(endLocation)}</span>
          </Stack>
        ),
      });
    }

    if (end) {
      const { time: endTime } = end;

      const startTimeDate = DateTime.fromISO(startTime);
      const endTimeDate = DateTime.fromISO(endTime);

      const tripInterval = Interval.fromDateTimes(startTimeDate, endTimeDate);
      const tripDurationMs = tripInterval.toDuration().toMillis();

      rows.push({
        label: 'Total time',
        value: humanizeDuration(tripDurationMs, { round: true }),
      });
    }

    rows.push({
      label: 'Total distance',
      value: `${totalDistance}m.`,
    });

    return rows;
  }, [trip]);

  return (
    <TableContainer>
      <Table aria-label="Trip details table">
        <TableBody>
          {tableRows
            .filter(({ value }) => !!value)
            .map((row) => (
              <TableRow key={row.label}>
                <TableCell>{row.label}</TableCell>
                <TableCell align="center">{row.value}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const formatLocation = ({ lat, lng }: google.maps.LatLngLiteral) => {
  return (
    <span>
      Lat: {lat} <br /> Lng: {lng}
    </span>
  );
};

export default memo(TripDetails);
