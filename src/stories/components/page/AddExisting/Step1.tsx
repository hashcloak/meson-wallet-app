import React from 'react'

import SelectMesonWallet from '../../template/SelectMesonWallet/SelectMesonWallet'
import Sidebar from '../../template/Sidebar/Sidebar'
import Topbar from '../../template/Topbar/Topbar'

import BaseLayout from '~/stories/utils/Layout/BaseLayout'

const Step1 = () => {
  return (
    <BaseLayout
      topbar={<Topbar />}
      sidebar={<Sidebar isStepper={true} isCreateNew={true} currentStep={0} />}
      body={<SelectMesonWallet />}
    />
  )
}

export default Step1
