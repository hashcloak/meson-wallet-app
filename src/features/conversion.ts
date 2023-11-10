import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type ConversionState = {
  conversionRate: number;
  conversionDate: number;
};

const initialState: ConversionState = { conversionRate: 0, conversionDate: 0 };

export const ConversionSlice = createSlice({
  name: 'mesonWallet',
  initialState,
  reducers: {
    setConversion: (state, action: PayloadAction<ConversionState>) => {
      state = action.payload;
    },
  },
});

export const { setConversion } = ConversionSlice.actions;
export default ConversionSlice.reducer;
