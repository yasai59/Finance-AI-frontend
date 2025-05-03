import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosClient from '../helpers/axiosClient'; // Asegúrate de tener un cliente Axios configurado
import InvestmentRecommendations from '../components/InvestmentRecommendations';

// Define la interfaz para una recomendación
interface Recommendation {
  title: string;
  description: string;
}

// Define la interfaz para el estado inicial
export interface RecommendationsState {
  financialScore: number;
  riskScore: number;
  recommendations: Recommendation[];
  investingRecommendation: any;
}

const initialState: RecommendationsState = {
  financialScore: 0,
  riskScore: 0,
  investingRecommendation: null,
  recommendations: [],
};

// Thunk para obtener recomendaciones desde la API
export const fetchRecommendations = createAsyncThunk(
  'recommendations/fetchRecommendations',
  async () => {
    const updateUser = await axiosClient.get('/update-profile')
    const advice = await axiosClient.get('/advice')
    const recommendations  = await axiosClient.get('/get-recommendations');

    const finalRecommendation: RecommendationsState = {
      financialScore: updateUser.data.data.financial_score,
      riskScore: updateUser.data.data.risk_score,
      investingRecommendation: advice.data.data,
      recommendations: recommendations.data.data
    }

    return finalRecommendation

  }
);

const recommendationsSlice = createSlice({
  name: 'recommendations',
  initialState,
  reducers: {
    addRecommendation: (state, action: PayloadAction<Recommendation>) => {
      state.recommendations.push(action.payload);
    },
    removeRecommendation: (state, action: PayloadAction<number>) => {
      state.recommendations.splice(action.payload, 1);
    },
    clearRecommendations: (state) => {
      state.recommendations = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendations.pending, (state) => {
        // Opcional: puedes manejar un estado de carga aquí
      })
      .addCase(fetchRecommendations.fulfilled, (state, action: PayloadAction<RecommendationsState>) => {
        state.financialScore = action.payload.financialScore;
        state.riskScore = action.payload.riskScore;
        state.recommendations = action.payload.recommendations;
        state.investingRecommendation = action.payload.investingRecommendation;
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        console.error('Error fetching recommendations:', action.error.message);
      });
  },
});

export const { addRecommendation, removeRecommendation, clearRecommendations } = recommendationsSlice.actions;
export default recommendationsSlice.reducer;