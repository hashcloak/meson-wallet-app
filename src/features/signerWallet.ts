import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const SignerWallets = {
  Trezor: 'Trezor',
  Ledger: 'Ledger',
  WalletConnect: 'WalletConnect',
  Hardhat: 'Hardhat',
} as const;

export type SupportedSignerWallet =
  (typeof SignerWallets)[keyof typeof SignerWallets];

export interface SignerState {
  signerWalletAddress: string;
  publicKey: string;
  serializedPath?: string;
  balance?: number | string;
  isConnected: boolean;
  wallet: SupportedSignerWallet | null;
}
const initialState: SignerState = {
  signerWalletAddress: '',
  publicKey: '',
  serializedPath: '',
  balance: 0,
  isConnected: false,
  wallet: null,
};

export const SignerWalletSlice = createSlice({
  name: 'signerWallet',
  initialState,
  reducers: {
    setSignerWallet: (state, action: PayloadAction<SignerState>) => ({
      ...state,
      signerWalletAddress: action.payload.signerWalletAddress,
      publicKey: action.payload.publicKey,
      serializedPath: action.payload.serializedPath,
      balance: action.payload.balance,
      isConnected: action.payload.isConnected,
      wallet: action.payload.wallet,
    }),
    resetSignerWallet: () => ({
      ...initialState,
    }),
  },
});

export const { setSignerWallet, resetSignerWallet } = SignerWalletSlice.actions;
export default SignerWalletSlice.reducer;
