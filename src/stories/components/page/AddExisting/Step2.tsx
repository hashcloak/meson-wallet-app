import React from 'react'

import OwnerSetting from '../../template/OwnerSetting/OwnerSetting'
import Sidebar from '../../template/Sidebar/Sidebar'
import Topbar from '../../template/Topbar/Topbar'

import BaseLayout from '~/stories/utils/Layout/BaseLayout'

const Step2 = () => {
  return (
    <BaseLayout
      topbar={<Topbar />}
      sidebar={<Sidebar isStepper={true} isCreateNew={false} currentStep={1} />}
      body={<OwnerSetting />}
    />
  )
}

export default Step2
