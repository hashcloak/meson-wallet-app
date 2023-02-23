import Accounts from '../../organisms/Accounts/Accounts'
import AssetChart from '../../organisms/AssetChart/AssetChart'
import Portfolio from '../../organisms/Portfolio/Portfolio'
import RecentTxs from '../../organisms/RecentTxs/RecentTxs'

import Spacer from '~/utils/Spacer'

const TxsContents = () => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full box-border'>
      <div className='flex flex-row w-full h-full box-border'>
        <AssetChart />
        <Spacer size={16} axis={'horizontal'} />
        <Portfolio />
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
