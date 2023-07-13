import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Contract } from 'ethers';

export type Owner = {
  ownerAddress: string;
  name: string;
  address: string;
};

export type MesonWalletState = {
  walletName?: string;
  owners?: Owner[];
  confirmation?: number;
  contract?: Contract | unknown;
};

const initialState: MesonWalletState = {
  walletName: '',
  owners: [],
  confirmation: 1,
  contract: undefined,
};

export const MesonWalletSlice = createSlice({
  name: 'mesonWallet',
  initialState,
  reducers: {
    setMesonWalletName: (state, action: PayloadAction<MesonWalletState>) => {
      state.walletName = action.payload.walletName;
    },
    setMesonWalletContract: (
      state,
      action: PayloadAction<{ contract: Contract }>
    ) => {
      state.contract = action.payload.contract;
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
  setMesonWalletContract,
  setOwners,
  resetMesonWallet,
} = MesonWalletSlice.actions;
export default MesonWalletSlice.reducer;
