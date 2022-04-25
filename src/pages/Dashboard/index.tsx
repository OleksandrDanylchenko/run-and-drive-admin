import { FC } from 'react';

import Grid from '@mui/material/Grid';

import ActiveRidesList from '@components/ActiveRidesList';
import GoogleMap from '@components/GoogleMap';

import { DashboardGrid } from './styles';

const Dashboard: FC = () => {
  return (
    <Grid container spacing={2} css={DashboardGrid}>
      <Grid item xs={5} sm={5} md={4} lg={3}>
        <ActiveRidesList />
      </Grid>
      <Grid item container xs>
        <Grid item xs={12}>
          <GoogleMap />
        </Grid>
        <Grid item xs={12}>
          User info
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
