import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  category: string | null;
  rating: number | null;
  price: string | null;
  searchQuery: string;
}

const initialState: FilterState = {
  category: null,
  rating: null,
  price: null,
  searchQuery: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.category = action.payload;
    },
    setRating: (state, action: PayloadAction<number | null>) => {
      state.rating = action.payload;
    },
    setPrice: (state, action: PayloadAction<string | null>) => {
      state.price = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearFilters: (state) => {
      state.category = null;
      state.rating = null;
      state.price = null;
      state.searchQuery = '';
    }
  },
});

export const { setCategory, setRating, setPrice, setSearchQuery, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;
