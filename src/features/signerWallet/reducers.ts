import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { setPrimarySigner } from './actions'

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
    set: (state, action: PayloadAction<any>) => {
      state.address = action.payload.address
      state.serializedPath = action.payload.serializedPath
      state.balance = action.payload.balance
    },
  },
})
