import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SignerState {
  address: string
  serializedPath?: string
  balance?: number
}
const initialState: SignerState = { address: '', serializedPath: '', balance: 0 }

export const signerWalletSlice = createSlice({
  name: 'signerWallet',
  initialState,
  reducers: {
    setSignerWallet: (state, action: PayloadAction<SignerState>) => ({
      ...state,
      address: action.payload.address,
      serializedPath: action.payload.serializedPath,
      balance: action.payload.balance,
    }),
  },
})
