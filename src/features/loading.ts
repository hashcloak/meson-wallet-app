import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type LoadingState = {
  isLoading: boolean;
  message?: string;
};

const initialState: LoadingState = {
  message: '',
  isLoading: false,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setStandby: (state) => {
      state.isLoading = false;
      state.message = '';
    },
    setLoading: (state) => {
      state.isLoading = true;
      state.message = '';
    },
    resetLoading: (state, action: PayloadAction<{ message: string }>) => {
      state.isLoading = false;
      state.message = action.payload.message;
    },
  },
});

export const { setLoading, resetLoading, setStandby } = loadingSlice.actions;
export default loadingSlice.reducer;
