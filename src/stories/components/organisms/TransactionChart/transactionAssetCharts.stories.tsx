import TransactionChart from './TransactionChart'

export default {
  title: 'Components/Organisms/TransactionChart',
  component: 'TransactionChart',
}

export const TransactionCharts = (): React.ReactElement => {
  return (
    <div className='flex flex-row w-screen flex-wrap'>
      {/* <DisplayBox title={'Charts'}> */}
      <TransactionChart />
      {/* </DisplayBox> */}
    </div>
  )
}