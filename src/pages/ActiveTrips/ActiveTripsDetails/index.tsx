import { FC } from 'react';

import Paper from '@mui/material/Paper';

import { DetailsWrapper } from './styles';

interface Props {
  tripId: string;
}

const ActiveTripsDetails: FC<Props> = ({ tripId }) => {
  return <Paper css={DetailsWrapper}>Details {tripId}</Paper>;
};

export default ActiveTripsDetails;
