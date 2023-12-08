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
  mesonWallet?: {
    mesonWalletAddress: string;
    smartContract: string;
    encryptedWallet: string;
  };
  balance?: {
    eth: string;
  };
  timestamp:number;
};

const initialState: MesonWalletState = {
  walletName: '',
  owners: [],
  confirmation: 1,
  mesonWallet: undefined,
  balance: {
    eth: '0',
  },
  timestamp:0,
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
        mesonWallet: {
          mesonWalletAddress: string;
          smartContract: string;
          encryptedWallet: string;
        };
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
    setTimestamp: (state, action: PayloadAction<MesonWalletState>) => {
      state.timestamp = Number(action.payload.timestamp);
    },
  },
});

export const {
  setMesonWalletName,
  setMesonWallet,
  setOwners,
  setBalance,
  setTimestamp,
  resetMesonWallet,
} = MesonWalletSlice.actions;
export default MesonWalletSlice.reducer;
