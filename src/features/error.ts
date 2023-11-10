import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type ErrorState = {
  error?: unknown;
  isError: boolean;
};

const initialState: ErrorState = {
  error: null,
  isError: false,
};

export const ErrorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<{ error: unknown }>) => {
      state.error = action.payload.error;
      state.isError = true;
    },
    resetError: (state) => {
      state.error = null;
      state.isError = false;
    },
  },
});

export const { resetError, setError } = ErrorSlice.actions;
export default ErrorSlice.reducer;
