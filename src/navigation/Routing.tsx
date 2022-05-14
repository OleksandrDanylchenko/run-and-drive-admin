import React, { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { ProtectedRoute } from 'run-and-drive-lib/router';

import ActiveTrips from '@pages/ActiveTrips';
import Home from '@pages/Home';
import SignIn from '@pages/SignIn';
import { useAppSelector } from '@redux/hooks';
import { selectAuthData } from '@redux/selectors/authentication_selectors';

const Routing: FC = () => {
  const authData = useAppSelector(selectAuthData);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute isAllowed={!authData} redirectPath="/" />}>
          <Route path="/signin" element={<SignIn />} />
        </Route>
        <Route element={<ProtectedRoute isAllowed={!!authData} redirectPath="/login" />}>
          <Route path="/" element={<Home />}>
            <Route index element={<ActiveTrips />} />
          </Route>
        </Route>
        <Route element={<Navigate to="/" />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
