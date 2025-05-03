import axios from "axios";
import store from "../store"; // Importa el store para acceder al estado del usuario
import { clearUser } from "../redux/userSlice";

// Crear una instancia de Axios
const axiosClient = axios.create({
  baseURL: "http://172.20.10.3:3001", // API url
  timeout: 10000,
});

// Interceptor para añadir el token al header Authorization
axiosClient.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.user.user?.token;

    if (token) {
      config.headers.Authorization = `${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Interceptor para manejar errores de respuesta (como expiración del token)
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Si el token expira o no es válido, limpia el estado del usuario
      store.dispatch(clearUser());
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
