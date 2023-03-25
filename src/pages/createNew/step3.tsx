import React from 'react'
import Sidebar from '@/components/templates/Sidebar'
import Topbar from '@/components/templates/Topbar'
import WalletReview from '@/components/templates/WalletReview'
import { BaseLayout } from '@/utils/Layouts'

const Step3 = () => {
  return (
    <BaseLayout
      topbar={<Topbar />}
      sidebar={<Sidebar isStepper={true} isCreateNew={true} currentStep={2} />}
      body={<WalletReview />}
    />
  )
}

export default Step3
