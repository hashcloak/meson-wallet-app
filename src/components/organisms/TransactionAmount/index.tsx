import { useSelector } from 'react-redux';
import Chart from '~/components/atoms/Chart';
import Stat from '~/components/atoms/Stat';
import { BasicTabs } from '~/components/molecules/Tabs';
import { HistoricalTxsState } from '~/features/historicalTxs';
import { RootState } from '~/features/reducers';
import { useCountTxs } from '~/hooks/useCountTx';

const TransactionAmount: React.FC = () => {
  const { historicalTxs } = useSelector<RootState, HistoricalTxsState>(
    (state) => state.historicalTxs
  );
  const { year, month, week, totalHistoriedTxs } = useCountTxs(historicalTxs);

  const tabList: Array<{ [key: string]: JSX.Element }> = [
    { Weekly: <Chart data={week} isDashboard={false} /> },
    { Monthly: <Chart data={month} isDashboard={false} /> },
    { Yearly: <Chart data={year} isDashboard={false} /> },
  ];

  return (
    <div className='flex flex-col w-full'>
      <span className='text-textGray dark:text-textWhite text-2xl font-bold'>
        Transaction amount
      </span>
      <div className='flex flex-col justify-center rounded-2xl bg-bgGrayMid dark:bg-bgDarkMid px-8 py-6  h-full box-border'>
        <BasicTabs tabList={tabList} />
        <div className='flex flex-row w-full justify-around'>
          <Stat title={'queue'} data={0} />
          <Stat title={'historied'} data={totalHistoriedTxs} />
        </div>
      </div>
    </div>
  );
};

export default TransactionAmount;
