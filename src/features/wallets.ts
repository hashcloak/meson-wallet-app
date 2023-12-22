import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { MesonWalletState } from './mesonWallet';
import { NetworkState } from './network';

export type WalletState = {
  mesonWallet: MesonWalletState;
  network: NetworkState;
};

export type WalletsState = {
  wallets: WalletState[] | [];
};

const initialState: WalletsState = {
  wallets: [],
};

export const WalletsSlice = createSlice({
  name: 'Wallet',
  initialState,
  reducers: {
    addWallet: (state, action: PayloadAction<WalletState>) => {
      state.wallets = [...state.wallets, action.payload];
    },
    updateMesonWallet: (state, action: PayloadAction<MesonWalletState>) => {
      const updatedWallets = state.wallets
        .map((w) => {
          if (
            w.mesonWallet.mesonWallet?.mesonWalletAddress ===
            action.payload.mesonWallet?.mesonWalletAddress
          ) {
            return {
              mesonWallet: {
                walletName: action.payload.walletName,
                owners: action.payload.owners,
                confirmation: action.payload.confirmation,
                mesonWallet: action.payload.mesonWallet,
                balance: action.payload.balance,
                timestamp: action.payload.timestamp,
              },
              network: w.network,
            };
          }

          return w;
        })
        .sort((x, y) => y.mesonWallet.timestamp - x.mesonWallet.timestamp);
      state.wallets = updatedWallets;
    },
    removeWallet: (state, action: PayloadAction<string>) => {
      state.wallets = sstate.wallets.filter(
        (w) => w.mesonWallet.mesonWallet?.mesonWalletAddress !== action.payload
      );
    },
    resetWallets: (state) => {
      state.wallets = [];
    },
  },
});

export const { addWallet, updateMesonWallet, removeWallet, resetWallets } =
  WalletsSlice.actions;
export default WalletsSlice.reducer;
