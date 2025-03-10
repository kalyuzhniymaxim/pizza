import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  activCategories: 0,
  activeSort: { name: 'популярности DESC', sortProperty: 'rating' },
  curentPage: 1,
};
export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActivCategories(state, action) {
      state.activCategories = action.payload;
    },
    setActiveSort(state, action) {
      state.activeSort = action.payload;
    },
    setCurentPage(state, action) {
      state.curentPage = action.payload;
    },
    setFilter(state, action) {
      state.activeSort = action.payload.activeSort;
      state.activCategories = Number(action.payload.activCategories);
      state.curentPage = Number(action.payload.curentPage);
    },
  },
});

export const { setActivCategories, setActiveSort, setCurentPage, setFilter } = filterSlice.actions;

export default filterSlice.reducer;
