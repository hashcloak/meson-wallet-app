import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type NetworkState = {
  network: string;
  chainId?: number;
};

const initialState: NetworkState = {
  network: 'mainnet',
  chainId: 1,
};

export const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    setNetwork: (state, action: PayloadAction<NetworkState>) => {
      state.network = action.payload.network;
      if (state.chainId != null) {
        state.chainId = action.payload.chainId;
      }
    },
    resetNetwork: (state) => {
      state.network = 'mainnet';
      state.chainId = 1;
    },
  },
});

export const { setNetwork, resetNetwork } = networkSlice.actions;
export default networkSlice.reducer;
