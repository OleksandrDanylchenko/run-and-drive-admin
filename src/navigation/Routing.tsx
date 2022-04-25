import React, { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Dashboard from '@pages/Dashboard';
import Home from '@pages/Home';

const Routing: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Dashboard />} />
      </Route>
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
);

export default Routing;
