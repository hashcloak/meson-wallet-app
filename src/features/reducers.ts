import { combineReducers } from 'redux';
import { ErrorSlice } from './error';
import { LedgerSlice } from './ledgerWallet';
import { LoadingSlice } from './loading';
import { MesonWalletSlice } from './mesonWallet';
import { NetworkSlice } from './network';
import { SignerWalletSlice } from './signerWallet';
import { TrezorSlice } from './trezorWallet';

const reducers = combineReducers({
  signerWallet: SignerWalletSlice.reducer,
  trezorWallet: TrezorSlice.reducer,
  ledgerWallet: LedgerSlice.reducer,
  loading: LoadingSlice.reducer,
  network: NetworkSlice.reducer,
  mesonWallet: MesonWalletSlice.reducer,
  error: ErrorSlice.reducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
