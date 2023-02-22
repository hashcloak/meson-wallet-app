import RecentTxs from './RecentTxs'

export default {
  title: 'Components/Organisms/RecentTxs',
  component: RecentTxs,
}

export const Default = (): React.ReactElement => {
  return (
    <div className='flex flex-row w-screen flex-wrap'>
      <div className='flex flex-row flex-wrap w-full mt-8'>
        <RecentTxs />
      </div>
    </div>
  )
}
