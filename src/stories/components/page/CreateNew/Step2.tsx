import React from 'react'

import RegisterAccountInfo from '../../template/RegisterAccountInfo/RegisterAccountInfo'
import Sidebar from '../../template/Sidebar/Sidebar'
import Topbar from '../../template/Topbar/Topbar'

import BaseLayout from '~/stories/utils/Layout/BaseLayout'

const Step2 = () => {
  return (
    <BaseLayout
      topbar={<Topbar />}
      sidebar={<Sidebar isStepper={true} isCreateNew={true} currentStep={1} />}
      body={<RegisterAccountInfo />}
    />
  )
}

export default Step2
