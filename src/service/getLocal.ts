import { BlockWithTransactions } from '@ethersproject/abstract-provider';
import { ethers } from 'ethers';
import { getProvider } from './getProvider';
import { MONTHS, SortTxsReturnType, groupBySum } from '~/utils/sortTxs';
import { trimEth } from '~/utils/trimDecimal';

export type CustomTransactionResponseType = Array<{
  transactions: ethers.providers.TransactionResponse;
  timeStamp: string;
  gasUsed: string;
}>;

export const getLocalHistoricalTxs = async (
  address: string | undefined,
  network: string
): Promise<CustomTransactionResponseType | []> => {
  if (address === undefined) return [];
  const provider = getProvider(network);
  const transactionCount = 25;

  const blocks: BlockWithTransactions[] = [];
  const txs: CustomTransactionResponseType = [];

  for (let index = 0; index < transactionCount; index++) {
    const block = await provider.getBlockWithTransactions(index);
    if (block !== null) blocks.push(block);
  }

  blocks.forEach((block) => {
    if (block.transactions.length > 0) {
      block.transactions.forEach((tx) => {
        const filteredTx = {
          timeStamp:
            tx.timestamp != null
              ? String(tx.timestamp)
              : String(block.timestamp),
          transactions: tx,
          gasUsed: String(block.gasUsed),
        };
        txs.push(filteredTx);
      });
    }
  });

  return txs;
};

export const localSortByWeek = (
  txs: CustomTransactionResponseType,
  walletAddress: string
): SortTxsReturnType => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const numDay = today.getDate();

  const start = new Date(today);
  start.setDate(numDay - dayOfWeek);
  start.setHours(0, 0, 0, 0);

  const end = new Date(today);
  end.setDate(numDay + (7 - dayOfWeek));
  end.setHours(0, 0, 0, 0);

  const txInThisWeek = txs
    .filter((tx) => {
      const unixTime = Number(tx.timeStamp) * 1000;
      const txDate = new Date(unixTime);

      return +txDate >= +start && +txDate < +end;
    })
    .sort((x, y) => Number(x.timeStamp) - Number(y.timeStamp));

  return localFormatTxArray(txInThisWeek, walletAddress);
};

const localFormatTxArray = (
  txs: CustomTransactionResponseType,
  walletAddress: string
): SortTxsReturnType => {
  if (txs.length > 0) {
    const txsForAssetChart = txs.map((tx) => {
      const unixTime = Number(tx.timeStamp) * 1000;
      const month = MONTHS[new Date(unixTime).getMonth()];
      const txDate = `${new Date(unixTime).getDate()} ${month}`;

      const value = Number(ethers.utils.formatUnits(tx.transactions.value));
      const gasUsed = Number(ethers.utils.formatUnits(tx.gasUsed, 'gwei'));
      const gasPrice = Number(
        ethers.utils.formatUnits(tx.transactions.gasPrice ?? '0', 'gwei')
      );

      let received = 0;
      let sent = 0;

      if (tx.transactions.from.toLowerCase() === walletAddress.toLowerCase()) {
        sent = value + gasUsed * gasPrice;
      } else if (
        tx.transactions.to != null &&
        tx.transactions.to.toLowerCase() === walletAddress.toLowerCase()
      ) {
        received = value;
      }

      return {
        Date: txDate,
        Received: Number(trimEth(String(received))),
        Sent: Number(trimEth(String(sent))),
      };
    });

    const newArrayOfObjects = groupBySum(
      txsForAssetChart,
      ['Date'],
      ['Received', 'Sent']
    );

    return newArrayOfObjects;
  } else {
    return [];
  }
};
