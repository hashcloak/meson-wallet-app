import { combineReducers } from 'redux';
import { ConversionSlice } from './conversion';
import { ErrorSlice } from './error';
import { HistoricalTxsSlice } from './historicalTxs';
import { LedgerSlice } from './ledgerWallet';
import { LoadingSlice } from './loading';
import { MesonWalletSlice } from './mesonWallet';
import { NetworkSlice } from './network';
import { SignerWalletSlice } from './signerWallet';
import { ToastSlice } from './toast';
import { TrezorSlice } from './trezorWallet';

const reducers = combineReducers({
  wallets: combineReducers({
    wallet1: combineReducers({
      signerWallet: SignerWalletSlice.reducer,
      trezorWallet: TrezorSlice.reducer,
      ledgerWallet: LedgerSlice.reducer,
      network: NetworkSlice.reducer,
      mesonWallet: MesonWalletSlice.reducer,
      historicalTxs: HistoricalTxsSlice.reducer,
      conversion: ConversionSlice.reducer,
    }),
    wallet2: combineReducers({
      signerWallet: SignerWalletSlice.reducer,
      trezorWallet: TrezorSlice.reducer,
      ledgerWallet: LedgerSlice.reducer,
      network: NetworkSlice.reducer,
      mesonWallet: MesonWalletSlice.reducer,
      historicalTxs: HistoricalTxsSlice.reducer,
      conversion: ConversionSlice.reducer,
    }),
  }),
  error: ErrorSlice.reducer,
  toast: ToastSlice.reducer,
  loading: LoadingSlice.reducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
