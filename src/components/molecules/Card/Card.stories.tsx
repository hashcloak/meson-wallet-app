import Card from '.';
import { HistoricalTxType } from '~/features/historicalTxs';

export default {
  title: 'Components/Molecules/Cards',
  component: 'Cards',
};

const tx: HistoricalTxType = {
  blockHash:
    '0x6abdd8af976b8b797eafb870e0454dd56a85fe90d6126082bc04b3ce43ad76be',
  blockNumber: '4',
  confirmations: '2',
  contractAddress: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
  cumulativeGasUsed: '',
  from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  functionName: '',
  gas: '',
  gasPrice: '2136807319',
  gasUsed: '1371941',
  hash: '0x04dded1ebabba96fbd857e2147b7ebd15f8ff0a61cf643fc40be92565ea6200b',
  input: '',
  isError: '',
  methodId: '',
  nonce: '3',
  timeStamp: '1699600737',
  to: '',
  transactionIndex: '',
  txreceipt_status: '',
  value: '0',
};

export const Cards = (): React.ReactElement => {
  return <Card tx={tx} />;
};
