import React, { FC } from 'react';

import Dashboard from '@components/Dashboard';
import ActiveTripsList from '@pages/ActiveTrips/ActiveTripsList';

const ActiveTrips: FC = () => {
  return <Dashboard sidebar={<ActiveTripsList />} map={<h2>Here will be the map</h2>} />;
};

export default ActiveTrips;
