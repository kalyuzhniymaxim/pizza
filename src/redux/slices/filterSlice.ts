import { TypeAction } from '@mui/material';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type Sort = {
  name: string;
  sortProperty: 'rating' | 'price' | 'title' | '-rating' | '-price' | '-title';
};

interface filterSlice {
  searchValue: string;
  activCategories: number;
  activeSort: Sort;
  curentPage: number;
}

const initialState: filterSlice = {
  searchValue: '',
  activCategories: 0,
  activeSort: { name: 'популярности DESC', sortProperty: 'rating' },
  curentPage: 1,
};
export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActivCategories(state, action: PayloadAction<number>) {
      state.activCategories = action.payload;
    },
    setActiveSort(state, action: PayloadAction<Sort>) {
      state.activeSort = action.payload;
    },
    setCurentPage(state, action: PayloadAction<number>) {
      state.curentPage = action.payload;
    },
    setFilter(state, action: PayloadAction<filterSlice>) {
      state.activeSort = action.payload.activeSort;
      state.activCategories = Number(action.payload.activCategories);
      state.curentPage = Number(action.payload.curentPage);
    },
  },
});

export const { setActivCategories, setActiveSort, setCurentPage, setFilter } = filterSlice.actions;

export default filterSlice.reducer;
