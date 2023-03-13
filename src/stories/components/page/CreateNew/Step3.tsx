import React from 'react'

import Sidebar from '../../template/Sidebar/Sidebar'
import Topbar from '../../template/Topbar/Topbar'
import WalletReview from '../../template/WalletReview/WalletReview'

import BaseLayout from '~/stories/utils/Layout/BaseLayout'

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
