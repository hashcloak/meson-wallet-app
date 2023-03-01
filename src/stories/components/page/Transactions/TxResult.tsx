import React from 'react'

import Sidebar from '../../template/Sidebar/Sidebar'
import Topbar from '../../template/Topbar/Topbar'
import TxDetails from '../../template/TxDetails/TxDetails'

import BaseLayout from '~/stories/utils/Layout/BaseLayout'

const TxResult = () => {
  return (
    <BaseLayout
      topbar={<Topbar />}
      sidebar={<Sidebar />}
      body={<TxDetails />}
    />
  )
}

export default TxResult
