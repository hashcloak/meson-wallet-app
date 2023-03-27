import React from 'react'
import Sidebar from '@/components/templates/Sidebar'
import Topbar from '@/components/templates/Topbar'
import TxDetails from '@/components/templates/TxDetails'
import { BaseLayout } from '@/utils/Layouts'

const TxResult = () => {
  return <BaseLayout topbar={<Topbar />} sidebar={<Sidebar />} body={<TxDetails />} />
}

export default TxResult
