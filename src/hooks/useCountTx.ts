import { useEffect, useState } from 'react';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { getPendingTxs } from '~/service/getPendingTxs';
import { MONTHS, WEEK, getLast12Months, getLast30Days } from '~/utils/sortTxs';

type DataOfTransactionType = {
  name?: string;
  'Queued Txs'?: number;
  'Historied Txs'?: number;
};
export type DataOfTransactionsType = DataOfTransactionType[];

type ReturnType = {
  year: DataOfTransactionsType;
  month: DataOfTransactionsType;
  week: DataOfTransactionsType;
  totalHistoriedTxs: number;
};

const useCountTxs = (historicalTxs: TransactionResponse[]): ReturnType => {
  const [countForYear, setCountForYear] = useState<DataOfTransactionsType>([
    {},
  ]);
  const [countForMonth, setCountForMonth] = useState<DataOfTransactionsType>([
    {},
  ]);
  const [countForWeek, setCountForWeek] = useState<DataOfTransactionsType>([
    {},
  ]);

  // Count for 12 months
  useEffect(() => {
    const twelveMonths = getLast12Months();
    const txsInYear = historicalTxs
      .filter((tx) => {
        const today = new Date();
        const unixTime = Number(tx.timeStamp) * 1000;
        const inYear = today.setMonth(today.getMonth() - 12);

        return inYear <= unixTime;
      })
      .map((tx) => {
        const dateOfTransaction = new Date(Number(tx.timeStamp) * 1000);
        const processedMonth = MONTHS[dateOfTransaction.getMonth()];
        const processedYear = dateOfTransaction
          .getFullYear()
          .toString()
          .slice(2);

        return `${processedYear} ${processedMonth}`;
      });

    const countedArray = formatArrays(twelveMonths, txsInYear);

    setCountForYear(countedArray);
  }, []);

  // Count for 30 days and 7 days
  useEffect(() => {
    const last30Days = getLast30Days();

    const txsInMonth = historicalTxs
      .filter((tx) => {
        const today = new Date();
        const unixTime = Number(tx.timeStamp) * 1000;
        const inMonth = today.setMonth(today.getDay() - 30);

        return inMonth <= unixTime;
      })
      .map((tx) => {
        const unixTime = Number(tx.timeStamp) * 1000;
        const dateOfTransaction = new Date(unixTime);
        const processedMonth = MONTHS[dateOfTransaction.getMonth()];
        const processedDay = dateOfTransaction.getDate();

        return `${processedMonth} ${processedDay}`;
      });

    const countedLast30Days = formatArrays(last30Days, txsInMonth);
    const countedLast7Days = formatArrays(last30Days, txsInMonth).slice(-7);

    const today = new Date().getDay();
    const convertedLast7Days: DataOfTransactionsType = [];
    let dayCounter = today + 1;
    countedLast7Days.forEach((day) => {
      const newDayOfWeek: DataOfTransactionType = {};
      if (dayCounter > 6) {
        dayCounter = 0;
      }
      newDayOfWeek.name = WEEK[dayCounter];
      newDayOfWeek['Historied Txs'] = Number(Object.values(day)[2]);
      newDayOfWeek['Queued Txs'] = 0;

      convertedLast7Days.push(newDayOfWeek);
      dayCounter++;
    });

    setCountForMonth(countedLast30Days);
    setCountForWeek(convertedLast7Days);
  }, []);

  getPendingTxs('localhost');

  return {
    year: countForYear,
    month: countForMonth,
    week: countForWeek,
    totalHistoriedTxs: historicalTxs.length,
  };
};

const formatArrays = (
  baseArray: Array<{ [key: string]: number }>,
  txArray: string[]
): DataOfTransactionsType => {
  let counter = 0;
  const newBaseArray = [] as DataOfTransactionsType;

  baseArray.forEach((date) => {
    const key = Object.keys(date)[0];
    txArray.forEach((tx) => {
      if (key === tx) {
        counter++;
      }
    });

    const newElement: DataOfTransactionType = {};
    newElement.name = key;
    newElement['Queued Txs'] = 0;
    newElement['Historied Txs'] = counter;

    newBaseArray.push(newElement);
    counter = 0;
  });

  return newBaseArray;
};

export { useCountTxs };
