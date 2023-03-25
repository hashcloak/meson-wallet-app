import QueueTable from '.'

export default {
  title: 'Components/Organisms/QueueTable',
  component: QueueTable,
}

export const Default = (): React.ReactElement => {
  return (
    <div className='flex flex-row w-screen flex-wrap'>
      <div className='flex flex-row flex-wrap w-full mt-8'>
        <QueueTable />
      </div>
    </div>
  )
}
