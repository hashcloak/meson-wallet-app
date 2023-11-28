import { ethers } from 'ethers';
import { mockHistoricalTxs } from './Mock';
import { trimEth } from './trimDecimal';
import { ExtendedTransactionResponse } from '~/features/historicalTxs';

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
  'Nov',
  'Dec',
];
export const WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const sortByYear = (
  txs: ExtendedTransactionResponse[],
  walletAddress: string
): SortTxsReturnType => {
  const txsInThisYear = txs
    .filter((tx) => {
      const unixTime = Number(tx.timestamp) * 1000;
      const today = new Date();
      const thisYear = today.getFullYear();

      return thisYear === new Date(unixTime).getFullYear();
    })
    .sort((x, y) => Number(x.timestamp) - Number(y.timestamp));

  return formatTxArray(txsInThisYear, walletAddress);
};

export const sortByLastFewMonths = (
  txs: ExtendedTransactionResponse[],
  walletAddress: string,
  monthRange: number
): SortTxsReturnType => {
  const today = new Date();
  const thisYear = today.getFullYear();
  const isThisMonth = today.getMonth() + 1;
  const isLastFewMonths = isThisMonth - monthRange;

  const txsInFewMonths = txs
    .filter((tx) => {
      const unixTime = Number(tx.timestamp) * 1000;
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
    .sort((x, y) => Number(x.timestamp) - Number(y.timestamp));

  return formatTxArray(txsInFewMonths, walletAddress);
};

export const sortByWeek = (
  txs: ExtendedTransactionResponse[],
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
      const unixTime = Number(tx.timestamp) * 1000;
      const txDate = new Date(unixTime);

      return +txDate >= +start && +txDate < +end;
    })
    .sort((x, y) => Number(x.timestamp) - Number(y.timestamp));

  return formatTxArray(txInThisWeek, walletAddress);
};

const formatTxArray = (
  txs: ExtendedTransactionResponse[],
  walletAddress: string
): SortTxsReturnType => {
  if (txs.length > 0) {
    const txsForAssetChart = txs.map((tx) => {
      const unixTime = Number(tx.timestamp) * 1000;
      const month = MONTHS[new Date(unixTime).getMonth()];
      const txDate = `${new Date(unixTime).getDate()} ${month}`;

      // const value = Number(ethers.utils.formatUnits(tx.value));
      // const gasUsed = Number(ethers.utils.formatUnits(tx.gasLimit, 'gwei'));
      // const gasPrice = Number(ethers.utils.formatUnits(tx.gasPrice, 'gwei'));
      console.log(tx)
      const value = Number(tx.value);
      const gasUsed = Number(tx.gasLimit);
      const gasPrice = Number(tx.gasPrice);

      let received = 0;
      let sent = 0;

      if (
        // index !== 0 &&
        tx.from.toLowerCase() === walletAddress.toLowerCase()
      ) {
        sent = value + gasUsed * gasPrice;
      } else if (
        // index !== 0 &&
        tx.to !== undefined &&
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

export const countByYear = (): void => {
  const today = new Date();
  const inYear = today.setMonth(today.getMonth() - 12);

  const txsInYear = mockHistoricalTxs.filter((tx) => {
    const unixTime = Number(tx.timestamp) * 1000;

    return inYear <= unixTime;
  });

  const txsInMonth = mockHistoricalTxs.filter((tx) => {
    const unixTime = Number(tx.timestamp) * 1000;
    const today = new Date();
    const inMonth = today.setMonth(today.getMonth() - 1);

    return inMonth <= unixTime;
  });

  const dayOfWeek = today.getDay();
  const numDay = today.getDate();

  const start = new Date(today);
  start.setDate(numDay - dayOfWeek);
  start.setHours(0, 0, 0, 0);

  const end = new Date(today);
  end.setDate(numDay + (7 - dayOfWeek));
  end.setHours(0, 0, 0, 0);

  const txsInWeek = mockHistoricalTxs.filter((tx) => {
    const unixTime = Number(tx.timestamp) * 1000;
    const txDate = new Date(unixTime);

    return +txDate >= +start && +txDate < +end;
  });

  console.log('y', txsInYear.length);
  console.log('m', txsInMonth.length);
  console.log('w', txsInWeek.length);
};

export const getLast12Months = (): Array<{ [key: string]: number }> => {
  const twelveMonths = [];
  // { name: '22 Mar', 'Queued Txs': 1, 'Historied Txs': 1 }

  for (let i = 11; i >= 0; i--) {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const month =
      MONTHS[new Date(firstDay.setMonth(firstDay.getMonth() - i)).getMonth()];
    const year = firstDay.getFullYear().toString().slice(2);
    const monthObj: { [key: string]: number } = {};

    if (month === undefined) {
      monthObj[`${year} ${MONTHS[11]}`] = 0;
    } else {
      monthObj[`${year} ${month}`] = 0;
    }

    twelveMonths.push(monthObj);
  }

  return twelveMonths;
};

export const getLast30Days = (): Array<{ [key: string]: number }> => {
  const thirtyDays = [];

  for (let i = 29; i >= 0; i--) {
    const today = new Date();
    const day = new Date(today.setDate(today.getDate() - i)).getDate();

    const month = MONTHS[today.getMonth()];
    const daysObj: { [key: string]: number } = {};
    daysObj[`${month} ${day}`] = 0;

    thirtyDays.push(daysObj);
  }

  return thirtyDays;
};
