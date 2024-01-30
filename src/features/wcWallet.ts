import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface wcWalletState {
  deposit?: string | undefined;
  session?: string | undefined;
}

const initialState: wcWalletState = {
  deposit: undefined,
  session: undefined,
};

export const wcWalletSlice = createSlice({
  name: 'wcWallet',
  initialState,
  reducers: {
    setWcWallet: (state, action: PayloadAction<wcWalletState>) => {
      state.deposit = action.payload.deposit;
      state.session = action.payload.session;
    },
    setWcWalletDeposit: (state, action: PayloadAction<wcWalletState>) => {
      state.deposit = action.payload.deposit;
    },
    resetWcWallet: () => ({
      ...initialState,
    }),
  },
});

export const { setWcWallet, setWcWalletDeposit, resetWcWallet } = wcWalletSlice.actions;
export default wcWalletSlice.reducer;
