import axiosClient from './axiosClient';
import { setUser, clearUser } from '../redux/userSlice';
import store from '../store';

// Función para crear una cuenta
export const createAccount = async (data: {
  name: string;
  last_name: string;
  email: string;
  password: string;
}): Promise<void> => {
  try {
    const response = await axiosClient.post('/register', data);
    const { token, user } = response.data.data;
    

    store.dispatch(
      setUser({
        ...user,
        token,
      })
    );
  } catch (error) {
    // @ts-ignore
    throw error.response?.data;
  }
};

// Función para iniciar sesión
export const logIn = async (data: { email: string; password: string }): Promise<void> => {
  try {
    
    const response = await axiosClient.post('/login', data);
    const { token, user } = response.data.data;

    store.dispatch(
      setUser({
        ...user,
        token,
      })
    );
  } catch (error) {
    // @ts-ignore
    throw error.response?.data;
  }
};

// Función para cerrar sesión
export const logOut = (): void => {
  store.dispatch(clearUser());
};