import Tabs, { RecentQueue, RecentHistory } from '../../molecules/Tab/Tabs'

const RecentTxs = () => {
  const tabList: { [key: string]: JSX.Element }[] = [
    { Queue: <RecentQueue /> },
    { History: <RecentHistory /> },
  ]

  return (
    <div className='flex flex-col w-full'>
      <span className='text-textWhite text-2xl font-bold'>
        Recent Transactions
      </span>

      <div className='max-w-[50rem] rounded-2xl text-textWhite bg-bgDarkMid px-8 py-6 w-full h-full'>
        <Tabs tabList={tabList} />
      </div>
    </div>
  )
}

export default RecentTxs
