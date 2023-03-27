import React from 'react'
import DepositFund from '@/components/templates/DepositFunds'
import Sidebar from '@/components/templates/Sidebar'
import Topbar from '@/components/templates/Topbar'
import { BaseLayout } from '@/utils/Layouts'

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
