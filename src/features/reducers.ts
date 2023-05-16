import { combineReducers } from 'redux'
import { signerWalletSlice } from './signerWallet/reducers'

const reducers = combineReducers({
  signerWallet: signerWalletSlice.reducer,
})

export default reducers

export type RootState = ReturnType<typeof reducers>
