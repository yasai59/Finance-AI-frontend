import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import RenderProduct from '../pages/RenderProduct';

const PrivateRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/product/:productName" element={<RenderProduct />} />
      <Route path="/*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default PrivateRouter;