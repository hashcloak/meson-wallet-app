import { useEffect, useState } from 'react';
import { mockHistoricalTxs } from '~/utils/Mock';
import { MONTHS, WEEK, getLast12Months, getLast30Days } from '~/utils/sortTxs';

const useCountTxs = (): void => {
  const [countForYear, setCountForYear] = useState<
    Array<{ [key: string]: number }>
  >([{}]);
  const [countForMonth, setCountForMonth] = useState<
    Array<{ [key: string]: number }>
  >([{}]);
  const [countForWeek, setCountForWeek] = useState<
    Array<{ [key: string]: number }>
  >([{}]);

  useEffect(() => {
    const twelveMonths = getLast12Months();
    const txsInYear = mockHistoricalTxs
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

  useEffect(() => {
    const last30Days = getLast30Days();
    const txsInMonth = mockHistoricalTxs
      .filter((tx) => {
        const today = new Date();
        const unixTime = Number(tx.timeStamp) * 1000;
        const inMonth = today.setMonth(today.getDay() - 30);

        return inMonth <= unixTime;
      })
      .map((tx) => {
        const dateOfTransaction = new Date(Number(tx.timeStamp) * 1000);
        const processedMonth = MONTHS[dateOfTransaction.getMonth()];
        const processedDay = dateOfTransaction.getDay();

        return `${processedMonth} ${processedDay}`;
      });

    const countedLast30Days = formatArrays(last30Days, txsInMonth);
    const countedLast7Days = formatArrays(last30Days, txsInMonth).slice(-7);

    const today = new Date().getDay();
    const convertedLast7Days: Array<{ [key: string]: number }> = [];
    let dayCounter = today + 1;
    countedLast7Days.forEach((day) => {
      const newDayOfWeek: { [key: string]: number } = {};
      if (dayCounter > 6) {
        dayCounter = 0;
      }
      newDayOfWeek[WEEK[dayCounter]] = Object.values(day)[0];
      convertedLast7Days.push(newDayOfWeek);
      dayCounter++;
    });

    setCountForMonth(countedLast30Days);
    setCountForWeek(convertedLast7Days);
  }, []);

  console.log(countForYear);
  console.log(countForMonth);
  console.log(countForWeek);
};

const formatArrays = (
  baseArray: Array<{ [key: string]: number }>,
  txArray: string[]
): Array<{ [key: string]: number }> => {
  let counter = 0;
  const newBaseArray = [] as Array<{ [key: string]: number }>;

  baseArray.forEach((date) => {
    const key = Object.keys(date)[0];
    txArray.forEach((tx) => {
      if (key === tx) {
        counter++;
      }
    });
    const newElement: { [key: string]: number } = {};
    newElement[key] = counter;
    newBaseArray.push(newElement);
    counter = 0;
  });

  return newBaseArray;
};

export { useCountTxs };
