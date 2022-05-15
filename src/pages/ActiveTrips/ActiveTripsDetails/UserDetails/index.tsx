import { FC, useMemo } from 'react';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
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
import { skipToken } from '@reduxjs/toolkit/query';
import { FetchErrorAlert } from 'run-and-drive-lib/components';
import { TableRowData, User } from 'run-and-drive-lib/models';
import {
  TEN_MINUTES,
  stringAvatar,
  timeToHumanAndRelative,
} from 'run-and-drive-lib/utils';

import UserSkeleton from '@pages/ActiveTrips/ActiveTripsDetails/UserDetails/UserSkeleton';
import { useGetUserByIdQuery } from '@redux/queries/users';

interface Props {
  userId?: string;
}

const UserDetails: FC<Props> = ({ userId }) => {
  const {
    data: user,
    isSuccess: userLoaded,
    error: userError,
  } = useGetUserByIdQuery(userId || skipToken, {
    pollingInterval: TEN_MINUTES,
  });

  if (userError) return <FetchErrorAlert title="Cannot load user" error={userError} />;
  if (!user || !userLoaded) return <UserSkeleton />;

  return (
    <Card>
      <CardHeader
        title={
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h5">User details</Typography>
            <AccountCircleIcon />
          </Stack>
        }
      />
      <CardContent>
        <UserDetailsTable user={user} />
      </CardContent>
    </Card>
  );
};

const UserDetailsTable: FC<{ user: User }> = ({ user }) => {
  const { name, surname, photoUrl, tripsIds, createdAt, email, phone } = user;
  const fullName = `${name} ${surname}`;

  const tableRows = useMemo<TableRowData[]>(() => {
    const { localeString: registeredAtLocale, relative: registeredAtRelative } =
      timeToHumanAndRelative(createdAt);

    return [
      {
        label: 'Registered at',
        value: `${registeredAtLocale} (${registeredAtRelative})`,
      },
      {
        label: 'Trip number',
        value: tripsIds.length,
      },
      {
        label: 'Email',
        value: <a href={`mailto:${email}`}>{email}</a>,
      },
      {
        label: 'Phone',
        value: <a href={`tel:${phone}`}>{phone}</a>,
      },
    ];
  }, [createdAt, email, tripsIds.length, phone]);

  return (
    <TableContainer>
      <Table aria-label="Characteristics table">
        <TableBody>
          <TableRow>
            <TableCell colSpan={2}>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="center"
              >
                <Avatar
                  {...stringAvatar(fullName)}
                  src={photoUrl}
                  sx={{ width: 35, height: 35 }}
                />
                <Typography>{fullName}</Typography>
              </Stack>
            </TableCell>
          </TableRow>
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

export default UserDetails;
