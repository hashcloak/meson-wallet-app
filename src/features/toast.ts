import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type ToastState = {
  message?: unknown;
  hasMessage: boolean;
};

const initialState: ToastState = {
  message: null,
  hasMessage: false,
};

export const ToastSlice = createSlice({
  name: 'Toast',
  initialState,
  reducers: {
    setToast: (state, action: PayloadAction<{ message: string }>) => {
      state.message = action.payload.message;
      state.hasMessage = true;
    },
    resetToast: (state) => {
      state.message = null;
      state.hasMessage = false;
    },
  },
});

export const { resetToast, setToast } = ToastSlice.actions;
export default ToastSlice.reducer;
