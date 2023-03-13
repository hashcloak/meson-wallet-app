import { TableLongRow } from '../Table/CustomTable'

import { mockTransactions } from '~/stories/utils/Mock'

const QueueTable = () => {
  return (
    <div className='flex flex-col w-full h-full'>
      <span className='text-textWhite text-2xl font-bold'>Queue</span>
      <div className='rounded-2xl bg-bgDarkMid px-8 py-4 w-full h-full overflow-scroll  box-border'>
        <div className='grid grid-cols-2 gap-32 box-border text-textGrayLight w-full px-4 mb-2'>
          <div className='grid grid-cols-2 '>
            <span className='col-span-1'>Action</span>
            <span className='col-span-1'>Amount</span>
          </div>
          <div className='grid grid-cols-3 '>
            <span className='col-span-1'>Date</span>
            <span className='col-span-1'>Confirmation</span>
            <span className='col-span-1'>Status</span>
          </div>
        </div>
        <div className='box-border grid grid-cols-1 gap-2'>
          {mockTransactions ? (
            mockTransactions.map((tx) => (
              <TableLongRow tx={tx} key={tx.timestamp} />
            ))
          ) : (
            <div className='w-full h-full flex justify-center items-center'>
              <span className='text-textGrayLight'>No queued transaction</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default QueueTable
