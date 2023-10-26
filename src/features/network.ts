import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type NetworkState = {
  network: string;
  chainId: number;
  url: string;
  shortcut?: string;
};

export type NetworksState = {
  localhost: NetworkState;
  ethereum: NetworkState;
  sepolia: NetworkState;
};

const initialState: NetworkState = {
  network: 'localhost',
  url: 'http://127.0.0.1:8545/',
  chainId: 31337,
};

export const NetworkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    setNetwork: (state, action: PayloadAction<NetworkState>) => {
      state.network = action.payload.network;
      state.chainId = action.payload.chainId;
      state.url = action.payload.url;
      if (action.payload.url !== undefined) {
        state.shortcut = action.payload.shortcut;
      }
    },
    resetNetwork: (state) => {
      state.network = 'mainnet';
      state.chainId = 1;
    },
  },
});

export const { setNetwork, resetNetwork } = NetworkSlice.actions;
export default NetworkSlice.reducer;
