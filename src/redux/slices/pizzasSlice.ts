import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CartItems } from './cartSlice';

type FeatchPizzas = Record<string, string>;

export const featchPizzas = createAsyncThunk<CartItems[], FeatchPizzas>(
  'pizzas/featchIdStatus',
  async (params) => {
    const { category, search, order, sortBy, curentPage } = params;
    const { data } = await axios.get(
      `https://67c59241351c081993fa8d3d.mockapi.io/items?page=${curentPage}&limit=4${search}${category}&sortBy=${sortBy}&order=${order}`,
    );
    return data;
  },
);

interface PizzaState {
  items: CartItems[];
  isLoading: boolean;
  error: null | string | undefined;
}

const initialState: PizzaState = {
  items: [],
  isLoading: false,
  error: null,
};

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Используем builder callback
    builder.addCase(featchPizzas.pending, (state) => {
      state.isLoading = true; // Устанавливаем isLoading в true
      state.error = null; // Сбрасываем ошибку
      console.log('ожидание');
    });
    builder.addCase(featchPizzas.fulfilled, (state, action) => {
      state.isLoading = false; // Устанавливаем isLoading в false
      state.items = action.payload; // Загружаем данные
      console.log(state, 'успешно');
    });
    builder.addCase(featchPizzas.rejected, (state, action) => {
      state.isLoading = false; // Устанавливаем isLoading в false
      state.error = action.error.message; // Сохраняем сообщение об ошибке
      console.log('ошибка');
    });
  },
});

export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;
