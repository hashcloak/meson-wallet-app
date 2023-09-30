import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type LoadingState = {
  isLoading: boolean;
  message?: string;
  isDisabling?: boolean;
};

const initialState: LoadingState = {
  message: '',
  isLoading: false,
  isDisabling: false,
};

export const LoadingSlice = createSlice({
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
    setDisabling: (state) => {
      state.isDisabling = true;
    },
    resetLoading: (state, action: PayloadAction<{ message: string }>) => {
      state.isLoading = false;
      state.message = action.payload.message;
    },
    resetDisabling: (state) => {
      state.isDisabling = false;
    },
  },
});

export const {
  setLoading,
  resetLoading,
  setStandby,
  setDisabling,
  resetDisabling,
} = LoadingSlice.actions;
export default LoadingSlice.reducer;
