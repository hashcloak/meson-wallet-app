import Tabs, { RecentQueue, RecentHistory } from '../../molecules/Tab/Tabs'

const RecentTxs = () => {
  const tabList: { [key: string]: JSX.Element }[] = [
    { Queue: <RecentQueue /> },
    { History: <RecentHistory /> },
  ]

  return (
    <div className='max-w-[50rem] rounded-2xl text-textWhite bg-bgDarkMid px-8 py-6'>
      <Tabs tabList={tabList} />
    </div>
  )
}

export default RecentTxs
