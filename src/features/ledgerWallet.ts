import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { LedgerAccountType } from '~/hooks/wagumi/useConnectLedger';

export interface ILedgerState {
  ledgerAccounts: LedgerAccountType[];
}

const initialState: ILedgerState = {
  ledgerAccounts: [],
};

export const LedgerSlice = createSlice({
  name: 'ledger',
  initialState,
  reducers: {
    setLedgerAccounts: (
      state: ILedgerState,
      action: PayloadAction<LedgerAccountType[]>
    ) => {
      state.ledgerAccounts = action.payload;
    },
  },
});

export const { actions: ledgerActions, reducer: ledgerReducer } = LedgerSlice;
