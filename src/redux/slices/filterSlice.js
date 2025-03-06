import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activCategories: 0,
  activeSort: { name: 'популярности DESC', sortProperty: 'rating' },
};
export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActivCategories(state, action) {
      state.activCategories = action.payload;
    },
    setActiveSort(state, action) {
      state.activeSort = action.payload
    }
  },
});

export const { setActivCategories, setActiveSort } = filterSlice.actions;

export default filterSlice.reducer;
