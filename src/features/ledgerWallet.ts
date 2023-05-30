import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { LedgerAccountType } from '~/hooks/wagumi/useConnectLedger';
import { FullAccountType } from '~/service';

export interface ILedgerState {
  ledgerAccounts: LedgerAccountType[] | FullAccountType[];
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
      action: PayloadAction<LedgerAccountType[] | FullAccountType[]>
    ) => {
      state.ledgerAccounts = action.payload;
    },
  },
});

export const { actions: ledgerActions, reducer: ledgerReducer } = LedgerSlice;
