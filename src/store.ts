import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Usa localStorage como almacenamiento
import userReducer from './redux/userSlice';
import stockReducer from './redux/stockSlice';
import transactionReducer from './redux/TransactionSlice';
import recommendationReducer from './redux/recommendationSlice';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

// Tipado del estado raíz
import type { UserState } from './redux/userSlice'; // Asegúrate de exportar UserState desde userSlice.ts
import type { TransactionState } from './redux/TransactionSlice'; // Asegúrate de exportar TransactionState desde TransactionSlice.ts
import type { RecommendationsState } from './redux/recommendationSlice';

// Configuración de persistencia para el usuario
const userPersistConfig: PersistConfig<UserState> = {
  key: 'user',
  storage,
};

// Configuración de persistencia para las transacciones
const transactionPersistConfig: PersistConfig<TransactionState> = {
  key: 'transactions',
  storage,
};

// Configuración de persistencia para las recomendaciones
const recommendationsPersistConfig: PersistConfig<RecommendationsState> = {
  key: 'recommendations',
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedTransactionReducer = persistReducer(transactionPersistConfig, transactionReducer);
const persistedRecommendationsReducer = persistReducer(recommendationsPersistConfig, recommendationReducer);

const store = configureStore({
  reducer: {
    user: persistedUserReducer, // Reducer persistente para el usuario
    stocks: stockReducer,
    transactions: persistedTransactionReducer, // Reducer persistente para las transacciones
    recommendations: persistedRecommendationsReducer, // Reducer persistente para las recomendaciones
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Tipos para el store y el dispatch
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);
export default store;