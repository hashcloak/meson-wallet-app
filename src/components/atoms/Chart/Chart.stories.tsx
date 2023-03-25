import Chart from '.'

export default {
  title: 'Components/Atmos/Chart',
  component: 'Chart',
}

export const Default = (): React.ReactElement => {
  const lineData = [
    { name: '22 Mar', Amount: 100 },
    { name: '22 Apr', Amount: 2400 },
    { name: '22 May', Amount: 500 },
    { name: '22 Jun', Amount: 100 },
    { name: '22 Jul', Amount: 500 },
    { name: '22 Aug', Amount: 2400 },
    { name: '22 Sep', Amount: 1600 },
    { name: '22 Oct', Amount: 500 },
    { name: '22 Nov', Amount: 2400 },
    { name: '22 Dec', Amount: 1600 },
    { name: '22 Jan', Amount: 100 },
    { name: '22 Feb', Amount: 100 },
  ]

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
  ]

  return (
    <div className='flex flex-row w-screen flex-wrap'>
      <Chart data={lineData} />
      <Chart data={barData} isBar={true} />
    </div>
  )
}
