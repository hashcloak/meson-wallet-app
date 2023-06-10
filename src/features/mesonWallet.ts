import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type MesonWalletState = {
  walletName: string;
  address?: string;
};

const initialState: MesonWalletState = {
  walletName: '',
  address: '',
};

export const MesonWalletSlice = createSlice({
  name: 'mesonWallet',
  initialState,
  reducers: {
    setMesonWalletName: (state, action: PayloadAction<MesonWalletState>) => {
      state.walletName = action.payload.walletName;
    },
    setMesonAddress: (state, action: PayloadAction<MesonWalletState>) => {
      state.address = action.payload.address;
    },
    resetMesonWallet: (state) => {
      state.walletName = '';
      state.address = '';
    },
  },
});

export const { setMesonWalletName, setMesonAddress, resetMesonWallet } =
  MesonWalletSlice.actions;
export default MesonWalletSlice.reducer;
