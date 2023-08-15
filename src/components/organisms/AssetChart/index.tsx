/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Chart from '~/components/atoms/Chart';
import { BasicTabs } from '~/components/molecules/Tabs';
import {
  useGetHistoricalAssets,
  useGetHistoricalTxs,
} from '~/hooks/useGetHistoricalAsset';

// import { sortByMonth, sortByWeek, sortByYear } from '~/utils/sortTxs';

// TODO: Check where to fetch the data and consider if props needs to be passed from the parent
const AssetChart: React.FC = () => {
  const latestHistoricalTxs = useGetHistoricalTxs();
  const historicalAssets = useGetHistoricalAssets(latestHistoricalTxs);

  const tabList: Array<{ [key: string]: JSX.Element }> = [
    { '1 wk': <Chart isDashboard={true} data={historicalAssets.week} /> },
    { '1 mo': <Chart isDashboard={true} data={historicalAssets.month} /> },
    {
      '3 mo': <Chart isDashboard={true} data={historicalAssets.threeMonths} />,
    },
    {
      '1/2 yr': <Chart isDashboard={true} data={historicalAssets.sixMonths} />,
    },
    { '1 yr': <Chart isDashboard={true} data={historicalAssets.year} /> },
  ];

  return (
    <div className='flex flex-col w-full'>
      <span className='text-textWhite text-2xl font-bold'>Asset Chart</span>
      <div className='rounded-2xl text-textWhite bg-bgDarkMid px-8 py-6 w-full h-full box-border'>
        <BasicTabs tabList={tabList} />
      </div>
    </div>
  );
};

export default AssetChart;
