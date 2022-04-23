import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '@components/Header';

const Home: FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Home;
