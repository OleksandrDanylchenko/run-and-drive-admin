import { FC } from 'react';

import Grid from '@mui/material/Grid';

import ActiveRidesList from '@components/ActiveRidesList';

import { DashboardGrid } from './styles';

const Dashboard: FC = () => {
  return (
    <Grid container spacing={2} css={DashboardGrid}>
      <Grid item xs={4}>
        <ActiveRidesList />
      </Grid>
      <Grid item container xs>
        <Grid item xs={12}>
          Map
        </Grid>
        <Grid item xs={12}>
          User info
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
