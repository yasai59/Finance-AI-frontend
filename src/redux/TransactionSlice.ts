import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosClient from '../helpers/axiosClient'; // Cliente Axios configurado

// Define la interfaz para una transacción
interface Transaction {
  type: 'buy' | 'sell' | 'entry' | 'save';
  product: string;
  quantity: number;
  date: string;
}

// Define la interfaz para el estado inicial
export interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  transactions: [],
  loading: false,
  error: null,
};

// Thunk para obtener las transacciones desde la API
export const fetchTransactions = createAsyncThunk('transactions/fetchTransactions', async () => {
  const response = await axiosClient.get('/transactions'); // Cambia '/transactions' por el endpoint de tu API
  const data = response.data.data.map((xd: any) => {
    return {
      type: xd.type,
      product: xd.symbol,
      quantity: xd.amount,
      date: xd.date,  
    }
  });

  return data;
});

// Thunk para hacer un POST de una transacción
export const postTransaction = createAsyncThunk(
  'transactions/postTransaction',
  async (transaction: Transaction) => {
    const response = await axiosClient.post('/transaction', {
      type: transaction.type,
      symbol: transaction.product,
      amount: transaction.quantity,
      date: transaction.date,
    }); // Cambia '/transactions' por tu endpoint
    return transaction;
  }
);

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
    },
    removeTransaction: (state, action: PayloadAction<number>) => {
      state.transactions.splice(action.payload, 1);
    },
    clearTransactions: (state) => {
      state.transactions = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching transactions';
      })
      .addCase(postTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postTransaction.fulfilled, (state, action: PayloadAction<Transaction>) => {
        state.loading = false;
        state.transactions.push(action.payload);
      })
      .addCase(postTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error posting transaction';
      });
  },
});

export const { addTransaction, removeTransaction, clearTransactions } = transactionSlice.actions;

export default transactionSlice.reducer;