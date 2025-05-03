import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStocks } from './redux/stockSlice';
import { fetchTransactions } from './redux/TransactionSlice';
import AppRouter from './router/AppRouter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importa los estilos de Toastify
import { RootState } from './store'; // Importa el tipo RootState
import { fetchRecommendations } from './redux/recommendationSlice';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user); // Obtener el usuario del estado global

  useEffect(() => {
    // Hacer fetch de las acciones siempre
    // @ts-ignore
    dispatch(fetchStocks());

    // Hacer fetch de las transacciones solo si hay un usuario
    if (user) {
      // @ts-ignore
      dispatch(fetchTransactions());
      // @ts-ignore
      dispatch(fetchRecommendations());
    }
  }, [dispatch, user]); // Ejecutar el efecto cuando cambia el usuario

  return (
    <>
      <AppRouter />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" // Tema oscuro para que coincida con tu diseño
      />
    </>
  );
};

export default App;
