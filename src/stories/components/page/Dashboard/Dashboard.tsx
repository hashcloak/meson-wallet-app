import ConnectSignerWallet from '../../template/ConnectSignerWallet/ConnectSignerWallet'
import Sidebar from '../../template/Sidebar/Sidebar'
import Topbar from '../../template/Topbar/Topbar'

import BaseLayout from '~/stories/utils/Layout/BaseLayout'

const Dashboard = () => {
  return (
    <BaseLayout
      topbar={<Topbar />}
      sidebar={<Sidebar />}
      body={<ConnectSignerWallet />}
    />
  )
}

export default Dashboard
