import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ethers,BigNumber } from 'ethers';


export interface ExtendedTransactionResponse
  extends Omit<
    ethers.providers.TransactionResponse,
    'gasPrice' | 'gasLimit' | 'value'
  > {
  gasPrice: BigNumber | string | number;
  gasLimit: BigNumber | string | number;
  value: BigNumber | string | number;
}

export type HistoricalTxType = {
  blockHash: string;
  blockNumber: string;
  confirmations: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  from: string;
  functionName: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  hash: string;
  input: string;
  isError: string;
  methodId: string;
  nonce: string;
  timeStamp: string;
  to: string;
  transactionIndex: string;
  txreceipt_status: string;
  value: string;
};

export type HistoricalTxsState = {
  historicalTxs: ExtendedTransactionResponse[] | [];
};


const initialState: HistoricalTxsState = {
  historicalTxs: [],
};

export const HistoricalTxsSlice = createSlice({
  name: 'historicalTxs',
  initialState,
  reducers: {
    setHistoricalTxs: (state, action: PayloadAction<HistoricalTxsState>) => {
      state.historicalTxs = action.payload.historicalTxs;
    },
  },
});

export const { setHistoricalTxs } = HistoricalTxsSlice.actions;
export default HistoricalTxsSlice.reducer;
