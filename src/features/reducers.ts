import { combineReducers } from 'redux';
import { LedgerSlice } from './ledgerWallet';
import { signerWalletSlice } from './signerWallet';
import { TrezorSlice } from './tezorWallet';

const reducers = combineReducers({
  signerWallet: signerWalletSlice.reducer,
  trezorWallet: TrezorSlice.reducer,
  ledgerWallet: LedgerSlice.reducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
