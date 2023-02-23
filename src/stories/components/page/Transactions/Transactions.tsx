import React from 'react'

import Sidebar from '../../template/Sidebar/Sidebar'
import Topbar from '../../template/Topbar/Topbar'
import TxsContents from '../../template/TxsContents/TxsContents'

import BaseLayout from '~/stories/utils/Layout/BaseLayout'

const Transactions = () => {
  return (
    <BaseLayout
      topbar={<Topbar />}
      sidebar={<Sidebar isStepper={true} isCreateNew={true} currentStep={0} />}
      body={<TxsContents />}
    />
  )
}

export default Transactions
