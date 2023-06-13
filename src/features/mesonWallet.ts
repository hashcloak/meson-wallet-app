import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type Owner = {
  name: string;
  address: string;
};

export type MesonWalletState = {
  walletName?: string;
  address?: string;
  owners?: Owner[];
  confirmation?: number;
};

const initialState: MesonWalletState = {
  walletName: '',
  address: '',
  owners: [],
  confirmation: 0,
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
    setOwners: (state, action: PayloadAction<MesonWalletState>) => {
      state.owners = action.payload.owners;
      state.confirmation = action.payload.confirmation;
    },
    resetMesonWallet: (
      state,
      action: PayloadAction<{ owners: Owner[]; confirmation: number }>
    ) => {
      state.owners = action.payload.owners;
    },
  },
});

export const {
  setMesonWalletName,
  setMesonAddress,
  setOwners,
  resetMesonWallet,
} = MesonWalletSlice.actions;
export default MesonWalletSlice.reducer;
