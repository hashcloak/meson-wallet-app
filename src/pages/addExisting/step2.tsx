import React from 'react'
import OwnerSetting from '@/components/templates/OwnerSetting'
import Sidebar from '@/components/templates/Sidebar'
import Topbar from '@/components/templates/Topbar'
import { BaseLayout } from '@/utils/Layouts'

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
