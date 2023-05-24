import { combineReducers } from 'redux';
import { signerWalletSlice } from './signerWallet';
import { TrezorSlice } from './tezorWallet';

const reducers = combineReducers({
  signerWallet: signerWalletSlice.reducer,
  trezorWallet: TrezorSlice.reducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
