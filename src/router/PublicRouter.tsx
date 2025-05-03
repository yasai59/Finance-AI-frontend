import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LogIn } from '../pages/LogIn';

const PublicRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LogIn />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default PublicRouter;