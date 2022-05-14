import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { skipToken } from '@reduxjs/toolkit/query';
import { TEN_MINUTES } from 'run-and-drive-lib/utils';

import Header from '@components/Header';
import { useAppSelector } from '@redux/hooks';
import { protectedAuthenticationApi } from '@redux/queries/authentication';
import { selectUserId } from '@redux/selectors/authentication_selectors';

const Home: FC = () => {
  const userId = useAppSelector(selectUserId);
  protectedAuthenticationApi.endpoints.getUserById.useQuerySubscription(
    userId || skipToken,
    {
      pollingInterval: TEN_MINUTES,
    },
  );

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Home;
