import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface MinusItemPayload {
  id: string; // Или number, если id числовой
}

export type CartItems = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  sizes: number;
  types: string;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItems[];
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItems(state, action: PayloadAction<CartItems>) {
      const findItem = state.items.find((item) => item.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.items.reduce((acc, item) => acc + item.price * item.count, 0);
    },
    cauntMinus(state, action: PayloadAction<MinusItemPayload>) {
      const findItem = state.items.find((item) => item.id === action.payload.id);
      if (findItem) {
        findItem.count--;
      }
    },
    removeItems(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});
export const selectCart = (state: RootState) => state.cart;

export const { addItems, removeItems, clearItems, cauntMinus } = cartSlice.actions;
export default cartSlice.reducer;
