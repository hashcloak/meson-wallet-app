import RecentQueues from '@/components/organisms/RecentQueue'
import Timeline from '@/components/organisms/Timeline'
import { transactions } from '@/components/organisms/Timeline/Timeline.stories'
import TransactionAmount from '@/components/organisms/TransactionAmount'
import Spacer from '@/utils/Spacer'

const TxsOverview = () => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full box-border'>
      <div className='flex flex-row w-full h-full box-border'>
        <RecentQueues />
        <Spacer size={16} axis={'horizontal'} />
        <TransactionAmount />
      </div>
      <Spacer size={16} axis={'vertical'} />
      <div className='flex flex-row w-full h-full box-border'>
        <Timeline txs={transactions} />
      </div>
    </div>
  )
}

export default TxsOverview
