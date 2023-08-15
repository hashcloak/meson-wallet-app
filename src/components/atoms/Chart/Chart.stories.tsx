import Chart from '.';

export default {
  title: 'Components/Atmos/Chart',
  component: 'Chart',
};

export const Default: React.FC = (): React.ReactElement => {
  const barData = [
    { name: '22 Mar', 'Queued Txs': 100, 'Historied Txs': 1600 },
    { name: '22 Apr', 'Queued Txs': 2400, 'Historied Txs': 1600 },
    { name: '22 May', 'Queued Txs': 500, 'Historied Txs': 1600 },
    { name: '22 Jun', 'Queued Txs': 100, 'Historied Txs': 1600 },
    { name: '22 Jul', 'Queued Txs': 500, 'Historied Txs': 1600 },
    { name: '22 Aug', 'Queued Txs': 2400, 'Historied Txs': 1600 },
    { name: '22 Mar', 'Queued Txs': 100, 'Historied Txs': 1600 },
    { name: '22 Apr', 'Queued Txs': 100, 'Historied Txs': 500 },
    { name: '22 May', 'Queued Txs': 100, 'Historied Txs': 2400 },
    { name: '22 Jun', 'Queued Txs': 100, 'Historied Txs': 1600 },
    { name: '22 Jul', 'Queued Txs': 100, 'Historied Txs': 100 },
    { name: '22 Aug', 'Queued Txs': 100, 'Historied Txs': 100 },
  ];

  const dashboardData = [
    { name: '22 Mar', Received: 100, Sent: 1600 },
    { name: '22 Apr', Received: 2400, Sent: 0 },
    { name: '22 May', Received: 500, Sent: 0 },
  ];

  return (
    <div className='flex flex-row w-screen flex-wrap'>
      <Chart data={dashboardData} isDashboard={true} />
      <Chart data={barData} />
    </div>
  );
};
