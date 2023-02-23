import RecentQueues from '../../organisms/RecentQueue/RecentQueues'
import Timeline from '../../organisms/Timeline/Timeline'
import TransactionAmount from '../../organisms/TransactionAmount/TransactionAmount'

import Spacer from '~/utils/Spacer'

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
        <Timeline />
      </div>
    </div>
  )
}

export default TxsOverview
