import Table from './Table'

export default {
  title: 'Components/Tables',
  component: 'Table',
}

export const TableSamples = (): React.ReactElement => {
  return (
    <div className='flex flex-row w-screen flex-wrap'>
      {/* <DisplayBox title={'Tables'}> */}
      <div className='flex flex-row flex-wrap w-full'>
        <Table />
      </div>
      {/* </DisplayBox> */}
    </div>
  )
}
