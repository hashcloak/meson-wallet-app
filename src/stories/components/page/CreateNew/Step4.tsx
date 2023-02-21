import React from 'react'

import DepositFund from '../../template/DepositFunds/DepositFund'
import Sidebar from '../../template/Sidebar/Sidebar'
import Topbar from '../../template/Topbar/Topbar'

import BaseLayout from '~/stories/utils/Layout/BaseLayout'

const Step4 = () => {
  return (
    <BaseLayout
      topbar={<Topbar />}
      sidebar={<Sidebar isStepper={true} isCreateNew={true} currentStep={3} />}
      body={<DepositFund />}
    />
  )
}

export default Step4
