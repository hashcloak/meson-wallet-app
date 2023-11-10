import Chart from '~/components/atoms/Chart';
import { BasicTabs } from '~/components/molecules/Tabs';

// TODO: Check where to fetch the data and consider if props needs to be passed from the parent
const TransactionChart: React.FC = () => {
  const week = [
    { name: 'Sun', 'Queued Txs': 10, 'Historied Txs': 1 },
    { name: 'Mon', 'Queued Txs': 23, 'Historied Txs': 1 },
    { name: 'Tue', 'Queued Txs': 3, 'Historied Txs': 2 },
    { name: 'Wed', 'Queued Txs': 7, 'Historied Txs': 1 },
    { name: 'Thu', 'Queued Txs': 2, 'Historied Txs': 0 },
    { name: 'Fri', 'Queued Txs': 3, 'Historied Txs': 2 },
    { name: 'Sat ', 'Queued Txs': 0, 'Historied Txs': 0 },
  ];

  const month = [
    { name: '14 Jan', 'Queued Txs': 1, 'Historied Txs': 1 },
    { name: '16 Jan', 'Queued Txs': 24, 'Historied Txs': 12 },
    { name: '18 Jan', 'Queued Txs': 1, 'Historied Txs': 1 },
    { name: '20 Jan', 'Queued Txs': 5, 'Historied Txs': 13 },
    { name: '22 Jan', 'Queued Txs': 1, 'Historied Txs': 1 },
    { name: '24 Jan', 'Queued Txs': 16, 'Historied Txs': 1 },
    { name: '26 Jan', 'Queued Txs': 5, 'Historied Txs': 4 },
    { name: '28 Jan', 'Queued Txs': 1, 'Historied Txs': 1 },
    { name: '30 Jan', 'Queued Txs': 24, 'Historied Txs': 1 },
    { name: '1 Feb', 'Queued Txs': 1, 'Historied Txs': 3 },
    { name: '3 Feb', 'Queued Txs': 1, 'Historied Txs': 0 },
    { name: '5 Feb', 'Queued Txs': 5, 'Historied Txs': 0 },
    { name: '7 Feb', 'Queued Txs': 24, 'Historied Txs': 1 },
    { name: '9 Feb', 'Queued Txs': 16, 'Historied Txs': 11 },
    { name: '11 Feb', 'Queued Txs': 16, 'Historied Txs': 4 },
    { name: '13 Feb', 'Queued Txs': 1, 'Historied Txs': 5 },
  ];

  const year = [
    { name: '22 Mar', 'Queued Txs': 1, 'Historied Txs': 1 },
    { name: '22 Apr', 'Queued Txs': 44, 'Historied Txs': 2 },
    { name: '22 May', 'Queued Txs': 5, 'Historied Txs': 23 },
    { name: '22 Jun', 'Queued Txs': 1, 'Historied Txs': 14 },
    { name: '22 Jul', 'Queued Txs': 5, 'Historied Txs': 1 },
    { name: '22 Aug', 'Queued Txs': 24, 'Historied Txs': 5 },
    { name: '22 Sep', 'Queued Txs': 16, 'Historied Txs': 3 },
    { name: '22 Oct', 'Queued Txs': 5, 'Historied Txs': 1 },
    { name: '22 Nov', 'Queued Txs': 24, 'Historied Txs': 1 },
    { name: '22 Dec', 'Queued Txs': 16, 'Historied Txs': 33 },
    { name: '22 Jan', 'Queued Txs': 1, 'Historied Txs': 1 },
    { name: '22 Feb', 'Queued Txs': 1, 'Historied Txs': 20 },
  ];

  const tabList: Array<{ [key: string]: JSX.Element }> = [
    { week: <Chart data={week} isBar={true} /> },
    { month: <Chart data={month} isBar={true} /> },
    { year: <Chart data={year} isBar={true} /> },
  ];

  return <BasicTabs tabList={tabList} />;
};

export default TransactionChart;
