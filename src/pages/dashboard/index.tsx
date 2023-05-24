import DashboardContents from '~/components/templates/DashboardContents';
import Sidebar from '~/components/templates/Sidebar';
import Topbar from '~/components/templates/Topbar';
import WagmiWalletConnect from '~/hooks/wagumi/WagmiWalletConnect';
import { BaseLayout } from '~/utils/Layouts';

const Dashboard: React.FC = () => {
  return (
    <div>
      <BaseLayout
        topbar={<Topbar />}
        sidebar={<Sidebar />}
        body={<DashboardContents />}
      />
      <WagmiWalletConnect />
    </div>
  );
};

export default Dashboard;
