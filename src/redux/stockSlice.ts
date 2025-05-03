import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../helpers/axiosClient';

// Define la interfaz para el estado inicial
interface StockState {
  stocks: any[]; 
  loading: boolean;
  error: string | null;
}

// Estado inicial
const initialState: StockState = {
  stocks: [],
  loading: false,
  error: null,
};

// Thunk para obtener los datos de las acciones
export const fetchStocks = createAsyncThunk('stocks/fetchStocks', async () => {
  const response = await axiosClient.get('/stocks'); 
  return response.data;
});

// Slice
const stockSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStocks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStocks.fulfilled, (state, action) => {
        state.loading = false;
        state.stocks = action.payload;
      })
      .addCase(fetchStocks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching stocks';
      });
  },
});

export default stockSlice.reducer;