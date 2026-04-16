import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isCartOpen: boolean;
  isAuthModalOpen: boolean;
  theme: 'light' | 'dark';
}

const initialState: UIState = {
  isCartOpen: false,
  isAuthModalOpen: false,
  theme: 'light',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    setCartOpen: (state, action: PayloadAction<boolean>) => {
       state.isCartOpen = action.payload;
    },
    toggleAuthModal: (state) => {
      state.isAuthModalOpen = !state.isAuthModalOpen;
    },
    setAuthModalOpen: (state, action: PayloadAction<boolean>) => {
       state.isAuthModalOpen = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    }
  },
});

export const { toggleCart, setCartOpen, toggleAuthModal, setAuthModalOpen, toggleTheme, setTheme } = uiSlice.actions;
export default uiSlice.reducer;
