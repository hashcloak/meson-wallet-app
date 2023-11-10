import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { EthereumAddress } from 'trezor-connect';
import { FullAccountType } from '~/service';

export interface ITrezorState {
  trezorAccounts: EthereumAddress[] | FullAccountType[];
}

const initialState: ITrezorState = {
  trezorAccounts: [],
};

export const TrezorSlice = createSlice({
  name: 'trezor',
  initialState,
  reducers: {
    setTrezorAccounts: (
      state: ITrezorState,
      action: PayloadAction<EthereumAddress[] | FullAccountType[]>
    ) => {
      state.trezorAccounts = action.payload;
    },
  },
});

export const { actions: trezorActions, reducer: trezorReducer } = TrezorSlice;
