import Accounts from '../../organisms/Accounts/Accounts'
import RecentQueues from '../../organisms/RecentQueue/RecentQueues'
import RecentTxs from '../../organisms/RecentTxs/RecentTxs'
import TransactionAmount from '../../organisms/TransactionAmount/TransactionAmount'

import Spacer from '~/utils/Spacer'

const TxsContents = () => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full box-border'>
      <div className='flex flex-row w-full h-full box-border'>
        <RecentQueues />
        <Spacer size={16} axis={'horizontal'} />
        <TransactionAmount />
      </div>
      <Spacer size={16} axis={'vertical'} />
      <div className='flex flex-row w-full h-full box-border'>
        <Accounts />
        <Spacer size={16} axis={'horizontal'} />
        <RecentTxs />
      </div>
    </div>
  )
}

export default TxsContents
