import DashboardContents from '../../template/DashboardContents/DashboardContents'
import Sidebar from '../../template/Sidebar/Sidebar'
import Topbar from '../../template/Topbar/Topbar'

import BaseLayout from '~/stories/utils/Layout/BaseLayout'

const Dashboard = () => {
  return (
    <BaseLayout
      topbar={<Topbar />}
      sidebar={<Sidebar />}
      body={<DashboardContents />}
    />
  )
}

export default Dashboard
