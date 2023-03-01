import Breadcrumb from '../../molecules/Breadcrumbs/Breadcrumb'
import { TxContents } from '../../molecules/Modal/TxModal'
import {
  mockTransactions as tx,
  RowBodyLong,
} from '../../organisms/Table/CustomTable'

import Spacer from '~/utils/Spacer'

const TxDetails = () => {
  return (
    <>
      <Breadcrumb />

      <div className='rounded-2xl bg-bgDarkMid py-4 px-8'>
        <div className='rounded-2xl bg-bgDarkLight h-16 flex items-center px-6'>
          <RowBodyLong
            timestamp={tx[0].timestamp!}
            status={tx[0].status}
            token={tx[0].token}
            amount={tx[0].amount}
            isSuccess={tx[0].isSuccess}
            numOfConfirmation={tx[0].numOfConfirmation}
          />
        </div>
        <Spacer size={24} axis={'vertical'} />
        <TxContents />
      </div>
    </>
  )
}

export default TxDetails
