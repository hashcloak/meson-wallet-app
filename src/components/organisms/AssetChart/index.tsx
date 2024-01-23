/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Chart from '~/components/atoms/Chart';
import { BasicTabs } from '~/components/molecules/Tabs';
import { useGetHistoricalAssets } from '~/hooks';

// import { sortByMonth, sortByWeek, sortByYear } from '~/utils/sortTxs';

// TODO: Check where to fetch the data and consider if props needs to be passed from the parent
const AssetChart: React.FC = () => {
  const historicalAssets = useGetHistoricalAssets();

  const tabList: Array<{ [key: string]: JSX.Element }> = [
    {
      '1 wk': (
        <Chart isDashboard={true} data={historicalAssets.week} key='1wk' />
      ),
    },
    {
      '1 mo': (
        <Chart isDashboard={true} data={historicalAssets.month} key='1mo' />
      ),
    },
    {
      '3 mo': (
        <Chart
          isDashboard={true}
          data={historicalAssets.threeMonths}
          key='3mo'
        />
      ),
    },
    {
      '1/2 yr': (
        <Chart
          isDashboard={true}
          data={historicalAssets.sixMonths}
          key='1/2yr'
        />
      ),
    },
    {
      '1 yr': (
        <Chart isDashboard={true} data={historicalAssets.year} key='1yr' />
      ),
    },
  ];

  return (
    <div className='flex flex-col w-full'>
      <span className='text-textGray dark:text-textWhite text-2xl font-bold'>
        Asset Chart
      </span>
      <div className='rounded-2xl text-textGray dark:text-textWhite bg-bgGrayMid dark:bg-bgDarkMid px-8 py-6 w-full h-full box-border'>
        <BasicTabs tabList={tabList} />
      </div>
    </div>
  );
};

export default AssetChart;
