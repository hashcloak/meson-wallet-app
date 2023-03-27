import React from 'react'
import ConnectSignerWallet from '@/components/templates/ConnectSignerWallet'
import Sidebar from '@/components/templates/Sidebar'
import Topbar from '@/components/templates/Topbar'
import { BaseLayout } from '@/utils/Layouts'

const Step1 = () => {
  return (
    <BaseLayout
      topbar={<Topbar />}
      sidebar={<Sidebar isStepper={true} isCreateNew={true} currentStep={0} />}
      body={<ConnectSignerWallet />}
    />
  )
}

export default Step1
