import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type Owner = {
  ownerAddress: string;
  name: string;
  address: string;
};

export type ContactType = {
  name: string;
  address: string;
};

export type MesonWalletState = {
  walletName?: string;
  owners?: Owner[];
  contacts?: ContactType[];
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
  contacts: [],
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
    setContacts: (state, action: PayloadAction<ContactType>) => {
      if (state.contacts !== undefined && action.payload !== undefined) {
        state.contacts = [...state.contacts, action.payload];
      } else {
        state.contacts = [action.payload];
      }
    },
    setBalance: (state, action: PayloadAction<MesonWalletState>) => {
      state.balance = action.payload.balance;
    },
    resetMesonWallet: () => ({
      ...initialState,
    }),
    removeContacts: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts?.filter(
        (c) => c.address.toLowerCase() !== action.payload.toLowerCase()
      );
    },
    editContacts: (
      state,
      action: PayloadAction<{
        removingAddress: string;
        newContact: ContactType;
      }>
    ) => {
      const filteredContacts =
        state.contacts !== undefined
          ? state.contacts?.filter(
              (c) => c.address !== action.payload.removingAddress
            )
          : [];
      state.contacts = [...filteredContacts, action.payload.newContact];
    },
    setTimestamp: (state) => {
      state.timestamp = new Date().getTime();
    },
    setAll: (state, action: PayloadAction<MesonWalletState>) => {
      state = action.payload;
    },
  },
});

export const {
  setMesonWalletName,
  setMesonWallet,
  setContacts,
  setOwners,
  setBalance,
  setTimestamp,
  resetMesonWallet,
  removeContacts,
  editContacts,
  setAll,
} = MesonWalletSlice.actions;
export default MesonWalletSlice.reducer;
