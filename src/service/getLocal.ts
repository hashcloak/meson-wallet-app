import { BlockWithTransactions } from '@ethersproject/abstract-provider';
import { ethers } from 'ethers';
import { getProvider } from './getProvider';
import {
  ExtendedTransactionResponse,
  HistoricalTxType,
} from '~/features/historicalTxs';
import { MONTHS, SortTxsReturnType, groupBySum } from '~/utils/sortTxs';
import { trimEth } from '~/utils/trimDecimal';

interface TransactionResponse extends ethers.providers.TransactionResponse {
  creates?: string | null;
}

export type CustomTransactionResponseType = Array<{
  transactions: TransactionResponse;
  timeStamp: string;
  gasUsed: string;
}>;

export const getLocalHistoricalTxs = async (
  address: string,
  contract: string,
  network: string
): Promise<ExtendedTransactionResponse[] | []> => {
  if (address === undefined) return [];
  const provider = getProvider(network);
  const transactionCount = 20;

  const blocks: BlockWithTransactions[] = [];
  const txs: CustomTransactionResponseType = [];

  for (let index = 0; index <= transactionCount; index++) {
    const block = await provider.getBlockWithTransactions(index);
    if (block !== null && block.transactions.length > 0) {
      blocks.push(block);
    }
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

  const filteredTxs: ExtendedTransactionResponse[] = txs
    .filter((tx) => {
      const { creates, from, to } = tx.transactions;

      if (creates !== null && creates !== undefined) {
        return creates.toLowerCase() === contract.toLowerCase();
      } else {
        return (
          from.toLowerCase() === address.toLowerCase() ||
          to?.toLocaleLowerCase() === address.toLowerCase()
        );
      }
    })
    .map((tx) => {
      return {
        blockHash: tx.transactions.blockHash ?? '',
        blockNumber: Number(tx.transactions.blockNumber) ?? 0,
        confirmations: Number(tx.transactions.confirmations) ?? 0,
        contractAddress: tx.transactions.creates ?? '',
        from: tx.transactions.from || '',
        gasPrice: String(tx.transactions.gasPrice),
        gasUsed: tx.gasUsed,
        hash: tx.transactions.hash ?? '',
        nonce: Number(tx.transactions.nonce),
        timestamp: Number(tx.timeStamp),
        to: tx.transactions.to ?? '',
        transactionIndex: '',
        txreceipt_status: '',
        value: String(ethers.utils.formatEther(tx.transactions.value)),
        gasLimit: String(ethers.utils.formatUnits(tx.transactions.gasLimit)) ?? '',
        // wait: tx.transactions.wait ?? '',
        data: tx.transactions.data ?? '',
        chainId: tx.transactions.chainId ?? '',
      };
    });

  return filteredTxs.sort((x, y) => Number(y.timestamp) - Number(x.timestamp));
};

export const localSortByWeek = (
  txs: HistoricalTxType[],
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
  txs: HistoricalTxType[],
  walletAddress: string
): SortTxsReturnType => {
  if (txs.length > 0) {
    const txsForAssetChart = txs.map((tx) => {
      const unixTime = Number(tx.timeStamp) * 1000;
      const month = MONTHS[new Date(unixTime).getMonth()];
      const txDate = `${new Date(unixTime).getDate()} ${month}`;

      const value = Number(ethers.utils.formatUnits(tx.value));
      const gasUsed = Number(ethers.utils.formatUnits(tx.gasUsed, 'gwei'));
      const gasPrice = Number(
        ethers.utils.formatUnits(tx.gasPrice ?? '0', 'gwei')
      );

      let received = 0;
      let sent = 0;

      if (tx.from.toLowerCase() === walletAddress.toLowerCase()) {
        sent = value + gasUsed * gasPrice;
      } else if (
        tx.to != null &&
        tx.to.toLowerCase() === walletAddress.toLowerCase()
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
