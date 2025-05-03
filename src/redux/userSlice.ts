import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define la interfaz para el usuario
interface User {
  name: string | null;
  last_name: string | null;
  email: string | null;
  token: string | null;
}

// Define la interfaz para el estado inicial
export interface UserState {
  user: User;
  logged_in: boolean;
}

const initialUser: User = {
  name: null,
  last_name: null,
  email: null,
  token: null,
};

const initialState: UserState = {
  user: initialUser,
  logged_in: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload; // Establece los datos del usuario
      state.logged_in = true; // Cambia logged_in a true
    },
    clearUser: (state) => {
      state.user = initialUser; // Limpia los datos del usuario
      state.logged_in = false; // Cambia logged_in a false
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;