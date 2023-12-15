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
  timestamp: number;
};

const initialState: MesonWalletState = {
  walletName: '',
  owners: [],
  confirmation: 1,
  mesonWallet: undefined,
  balance: {
    eth: '0',
  },
  timestamp: 0,
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
    resetMesonWallet: (state) => {
      state.walletName = initialState.walletName;
      state.owners = initialState.owners;
      state.confirmation = initialState.confirmation;
      state.mesonWallet = initialState.mesonWallet;
      state.balance = initialState.balance;
      state.timestamp = initialState.timestamp;
    },
    setTimestamp: (state) => {
      state.timestamp = new Date().getTime();
    },
    setAll: (
      state,
      action: PayloadAction<MesonWalletState>
    ) => {
      state.walletName = action.payload.walletName;
      state.owners = action.payload.owners;
      state.mesonWallet = action.payload.mesonWallet;
      state.balance = action.payload.balance;
      // state.confirmation = action.payload.confirmation;
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
  setAll
} = MesonWalletSlice.actions;
export default MesonWalletSlice.reducer;
