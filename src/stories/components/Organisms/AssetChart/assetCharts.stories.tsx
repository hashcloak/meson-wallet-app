import AssetChart from './AssetChart'

export default {
  title: 'Components/Organisms/AssetChart',
  component: 'AssetChart',
}

export const AssetCharts = (): React.ReactElement => {
  return (
    <div className='flex flex-row w-screen flex-wrap'>
      {/* <DisplayBox title={'Charts'}> */}
      <AssetChart />
      {/* </DisplayBox> */}
    </div>
  )
}
