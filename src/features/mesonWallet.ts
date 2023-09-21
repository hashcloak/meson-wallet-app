import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type Owner = {
  ownerAddress: string;
  name: string;
  address: string;
};

export type MesonWalletState = {
  walletName?: string;
  owners?: Owner[];
  confirmation?: number;
  mesonWallet?: { address: string; smartContract: string };
  balance?: {
    eth: string;
  };
};

const initialState: MesonWalletState = {
  walletName: '',
  owners: [],
  confirmation: 1,
  mesonWallet: undefined,
  balance: {
    eth: '0',
  },
};

export const MesonWalletSlice = createSlice({
  name: 'mesonWallet',
  initialState,
  reducers: {
    setMesonWalletName: (state, action: PayloadAction<MesonWalletState>) => {
      state.walletName = action.payload.walletName;
    },
    setMesonWallet: (
      state,
      action: PayloadAction<{
        mesonWallet: { address: string; smartContract: string };
      }>
    ) => {
      state.mesonWallet = action.payload.mesonWallet;
    },
    setOwners: (state, action: PayloadAction<MesonWalletState>) => {
      state.owners = action.payload.owners;
      state.confirmation = action.payload.confirmation;
    },
    setBalance: (state, action: PayloadAction<MesonWalletState>) => {
      state.balance = action.payload.balance;
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
  setMesonWallet,
  setOwners,
  setBalance,
  resetMesonWallet,
} = MesonWalletSlice.actions;
export default MesonWalletSlice.reducer;
