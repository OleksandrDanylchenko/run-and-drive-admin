import { FC, useMemo } from 'react';

import { css } from '@emotion/react';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
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
import { Car, TableRowData } from 'run-and-drive-lib/models';
import { toPercentString } from 'run-and-drive-lib/utils';

import { useGetLastTripRecordQuery } from '@redux/queries/sensors';

interface Props {
  car: Car;
  tripId: string;
}

const IndicatorsCard: FC<Props> = (props) => {
  return (
    <Card>
      <CardHeader
        title={
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h5">Indicators</Typography>
            <LocalGasStationIcon />
          </Stack>
        }
      />
      <CardContent>
        <IndicatorsTable {...props} />
      </CardContent>
    </Card>
  );
};

const IndicatorsTable: FC<Props> = ({ car, tripId }) => {
  const { data: lastRecord } = useGetLastTripRecordQuery(tripId);

  const tableRows = useMemo<TableRowData[]>(() => {
    const { fuelCapacity } = car;
    const { fuelTankOccupancy, wheelsPressure } = lastRecord || {
      fuelTankOccupancy: fuelCapacity,
      wheelsPressure: null,
    };

    const fuelTankOccupancyPercent = toPercentString(fuelTankOccupancy / fuelCapacity);

    return [
      {
        label: 'Fuel tank occupancy',
        value: (
          <Typography variant="body2">
            <strong>{Math.trunc(fuelTankOccupancy)}L.</strong> / {fuelCapacity}L. <br /> (
            {fuelTankOccupancyPercent})
          </Typography>
        ),
      },
      {
        label: 'Wheels pressure',
        value: wheelsPressure ? (
          <Stack spacing={1}>
            <Typography variant="body2" css={PressureRow}>
              Front Left: {wheelsPressure.frontLeft} bar
              <br />
              Front Right: {wheelsPressure.frontRight} bar
            </Typography>
            <Typography variant="body2" css={PressureRow}>
              Rear Left: {wheelsPressure.rearLeft} bar
              <br />
              Rear Right: {wheelsPressure.rearRight} bar
            </Typography>
          </Stack>
        ) : (
          'Ø'
        ),
      },
    ];
  }, [car, lastRecord]);

  return (
    <TableContainer>
      <Table aria-label="Indicators table">
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

const PressureRow = css`
  white-space: nowrap;
`;

export default IndicatorsCard;
