import { combineReducers } from 'redux';
import { LedgerSlice } from './ledgerWallet';
import { loadingSlice } from './loading';
import { networkSlice } from './network';
import { signerWalletSlice } from './signerWallet';
import { TrezorSlice } from './trezorWallet';

const reducers = combineReducers({
  signerWallet: signerWalletSlice.reducer,
  trezorWallet: TrezorSlice.reducer,
  ledgerWallet: LedgerSlice.reducer,
  loading: loadingSlice.reducer,
  network: networkSlice.reducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
