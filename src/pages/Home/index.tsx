import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import Toolbar from '@mui/material/Toolbar';

const Home: FC = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default Home;
