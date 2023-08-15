import { ethers } from 'ethers';
import { trimEth } from './trimDecimal';
import { HistoricalTxType } from '~/features/historicalTxs';

type ReturnType = Array<{ Date: string; Received: number; Sent: number }>;

const MONTHS = [
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
): ReturnType => {
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
): ReturnType => {
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
): ReturnType => {
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
): ReturnType => {
  console.log(txs);

  if (txs.length > 0) {
    const txsForAssetChart = txs.map((tx, index) => {
      const unixTime = Number(tx.timeStamp) * 1000;
      const month = MONTHS[new Date(unixTime).getMonth()];
      const txDate = `${new Date(unixTime).getDate()} ${month}`;

      const value = Number(ethers.utils.formatUnits(tx.value));
      const gasUsed = Number(ethers.utils.formatUnits(tx.gasUsed, 'gwei'));
      const gasPrice = Number(ethers.utils.formatUnits(tx.gasPrice, 'gwei'));

      let received = 0;
      let sent = 0;

      if (
        index !== 0 &&
        tx.from.toLowerCase() === walletAddress.toLowerCase()
      ) {
        sent = value + gasUsed * gasPrice;
      } else if (
        index !== 0 &&
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
    console.log(txsForAssetChart);

    return txsForAssetChart;
  } else {
    return [];
  }
};
