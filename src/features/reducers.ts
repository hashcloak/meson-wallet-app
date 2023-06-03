import { combineReducers } from 'redux';
import { LedgerSlice } from './ledgerWallet';
import { loadingSlice } from './loading';
import { signerWalletSlice } from './signerWallet';
import { TrezorSlice } from './tezorWallet';

const reducers = combineReducers({
  signerWallet: signerWalletSlice.reducer,
  trezorWallet: TrezorSlice.reducer,
  ledgerWallet: LedgerSlice.reducer,
  loading: loadingSlice.reducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
