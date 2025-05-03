import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';

const AppRouter: React.FC = () => {
  const loggedIn = useSelector((state: RootState) => state.user.logged_in);

  return loggedIn ? <PrivateRouter /> : <PublicRouter />;
};

export default AppRouter;