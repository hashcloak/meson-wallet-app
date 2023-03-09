import Tabs from '../../molecules/Tab/Tabs'
import { TableShortRow } from '../Table/CustomTable'

import { mockTransactions } from '~/stories/utils/Mock'

export const RecentQueue = () => {
  return (
    <div className='rounded-2xl bg-bgDarkMid py-4 w-full h-full overflow-scroll box-border'>
      <div className='box-border grid grid-cols-1 gap-2'>
        {mockTransactions ? (
          mockTransactions.map((tx) => (
            <TableShortRow tx={tx} key={tx.timestamp} />
          ))
        ) : (
          <div className='w-full h-full flex justify-center items-center'>
            <span className='text-textGrayLight'>No queued transaction</span>
          </div>
        )}
      </div>
    </div>
  )
}

export const RecentHistory = () => {
  return (
    <div className='rounded-2xl bg-bgDarkMid py-4 w-full h-full overflow-scroll box-border'>
      <div className='box-border grid grid-cols-1 gap-2'>
        {mockTransactions ? (
          mockTransactions.map((tx) => (
            <TableShortRow tx={tx} key={tx.timestamp} />
          ))
        ) : (
          <div className='w-full h-full flex justify-center items-center'>
            <span className='text-textGrayLight'>No queued transaction</span>
          </div>
        )}
      </div>
    </div>
  )
}

const RecentTxs = () => {
  const tabList: { [key: string]: JSX.Element }[] = [
    { Queue: <RecentQueue /> },
    { History: <RecentHistory /> },
  ]

  return (
    <div className='flex flex-col w-full'>
      <div className='flex flex-row justify-between'>
        <span className='text-textWhite text-2xl font-bold'>
          Recent Transactions
        </span>
        <a className='text-textLink text-sm'>more</a>
      </div>

      <div className='max-w-[50rem] rounded-2xl text-textWhite bg-bgDarkMid px-8 py-6 w-full h-full'>
        <Tabs tabList={tabList} />
      </div>
    </div>
  )
}

export default RecentTxs
