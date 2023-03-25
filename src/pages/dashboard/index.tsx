import DashboardContents from '@/components/templates/DashboardContents'
import Sidebar from '@/components/templates/Sidebar'
import Topbar from '@/components/templates/Topbar'
import { BaseLayout } from '@/utils/Layouts'

const Dashboard = () => {
  return <BaseLayout topbar={<Topbar />} sidebar={<Sidebar />} body={<DashboardContents />} />
}

export default Dashboard
