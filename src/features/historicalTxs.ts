import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// export type HistoricalTxType = {
//   accessList?: null;
//   blockHash?: string;
//   blockNumber?: number;
//   chainId?: number;
//   confirmations?: number;
//   creates?: null;
//   data?: string;
//   from?: string;
//   gasLimit: BigNumberish;
//   gasPrice: BigNumberish;
//   hash?: string;
//   nonce?: number;
//   timestamp: number;
//   to?: string;
//   transactionIndex?: number;
//   type?: number;
//   value: BigNumberish;
// };
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
  historicalTxs: HistoricalTxType[] | [];
};

// const historicalTx: HistoricalTxType = {
//   blockHash: '',
//   blockNumber: '',
//   confirmations: '',
//   contractAddress: '',
//   cumulativeGasUsed: '',
//   from: '',
//   functionName: '',
//   gas: '',
//   gasPrice: '',
//   gasUsed: '',
//   hash: '',
//   input: '',
//   isError: '',
//   methodId: '',
//   nonce: '',
//   timeStamp: '',
//   to: '',
//   transactionIndex: '',
//   txreceipt_status: '',
//   value: '',
// };

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
