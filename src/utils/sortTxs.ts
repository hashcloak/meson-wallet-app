import { ethers } from 'ethers';
import { trimEth } from './trimDecimal';
import { HistoricalTxType } from '~/features/historicalTxs';

export type SortTxsReturnType = Array<{
  Date: string;
  Received: number;
  Sent: number;
}>;

export const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'NovV',
  'Dec',
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const sortByYear = (
  txs: HistoricalTxType[],
  walletAddress: string
): SortTxsReturnType => {
  const txsInThisYear = txs
    .filter((tx) => {
      const unixTime = Number(tx.timeStamp) * 1000;
      const today = new Date();
      const thisYear = today.getFullYear();

      return thisYear === new Date(unixTime).getFullYear();
    })
    .sort((x, y) => Number(x.timeStamp) - Number(y.timeStamp));

  return formatTxArray(txsInThisYear, walletAddress);
};

export const sortByLastFewMonths = (
  txs: HistoricalTxType[],
  walletAddress: string,
  monthRange: number
): SortTxsReturnType => {
  const today = new Date();
  const thisYear = today.getFullYear();
  const isThisMonth = today.getMonth() + 1;
  const isLastFewMonths = isThisMonth - monthRange;

  const txsInFewMonths = txs
    .filter((tx) => {
      const unixTime = Number(tx.timeStamp) * 1000;
      const txYear = new Date(unixTime).getFullYear();
      const txMonth = new Date(unixTime).getMonth() + 1;
      if (txYear === thisYear && monthRange === 0) {
        return txMonth === isThisMonth;
      } else {
        return (
          txYear === thisYear &&
          txMonth <= isThisMonth &&
          txMonth >= isLastFewMonths
        );
      }
    })
    .sort((x, y) => Number(x.timeStamp) - Number(y.timeStamp));

  return formatTxArray(txsInFewMonths, walletAddress);
};

export const sortByWeek = (
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

  return formatTxArray(txInThisWeek, walletAddress);
};

const formatTxArray = (
  txs: HistoricalTxType[],
  walletAddress: string
): SortTxsReturnType => {
  console.log(txs);

  if (txs.length > 0) {
    const txsForAssetChart = txs.map((tx) => {
      const unixTime = Number(tx.timeStamp) * 1000;
      const month = MONTHS[new Date(unixTime).getMonth()];
      const txDate = `${new Date(unixTime).getDate()} ${month}`;

      const value = Number(ethers.utils.formatUnits(tx.value));
      const gasUsed = Number(ethers.utils.formatUnits(tx.gasUsed, 'gwei'));
      const gasPrice = Number(ethers.utils.formatUnits(tx.gasPrice, 'gwei'));

      let received = 0;
      let sent = 0;

      if (
        // index !== 0 &&
        tx.from.toLowerCase() === walletAddress.toLowerCase()
      ) {
        sent = value + gasUsed * gasPrice;
      } else if (
        // index !== 0 &&
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
    console.log('newArrayOfObjects', newArrayOfObjects);

    return txsForAssetChart;
  } else {
    return [];
  }
};

export const groupBySum = <T, K extends keyof T, S extends keyof T>(
  arr: T[],
  groupByKeys: K[],
  sumKeys: S[]
): Array<Pick<T, K | S>> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return [
    ...arr
      .reduce((accu, curr) => {
        const keyArr = groupByKeys.map((key) => curr[key]);
        const key = keyArr.join('-');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const groupedSum: any =
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          accu.get(key) ||
          Object.assign(
            {},
            Object.fromEntries(groupByKeys.map((key) => [key, curr[key]])),
            Object.fromEntries(sumKeys.map((key) => [key, 0]))
          );
        for (const key of sumKeys) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          (groupedSum[key] as number) += curr[key] as number;
        }

        return accu.set(key, groupedSum);
      }, new Map())
      .values(),
  ];
};
