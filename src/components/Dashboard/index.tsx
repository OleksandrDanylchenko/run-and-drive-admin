import { FC, ReactNode } from 'react';

import Grid from '@mui/material/Grid';

import { DashboardGrid } from './styles';

interface Props {
  sidebar: ReactNode;
  map: ReactNode;
  info?: ReactNode;
}

const Dashboard: FC<Props> = ({ sidebar, map, info }) => {
  return (
    <Grid container spacing={2} css={DashboardGrid}>
      <Grid item xs={5} sm={5} md={4} lg={3}>
        {sidebar}
      </Grid>
      <Grid item container xs spacing={2}>
        <Grid item xs={12}>
          {map}
        </Grid>
        {info && (
          <Grid item xs={12}>
            {info}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default Dashboard;
