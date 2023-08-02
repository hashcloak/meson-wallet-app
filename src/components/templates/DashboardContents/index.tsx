import Accounts from '~/components/organisms/Accounts';
import AssetChart from '~/components/organisms/AssetChart';
import Portfolio from '~/components/organisms/Portfolio';
import RecentTxs from '~/components/organisms/RecentTxs';
import Spacer from '~/utils/Spacer';

const DashboardContents: React.FC = () => {
  return (
    <div className='flex flex-col  items-center w-full box-border'>
      <div className='flex xl:flex-row flex-col w-full h-full box-border xl:justify-between'>
        <AssetChart />
        <Spacer size={16} axis={'horizontal'} />
        <Portfolio />
      </div>
      <Spacer size={16} axis={'vertical'} />
      <div className='flex xl:flex-row flex-col w-full h-full box-border xl:justify-between'>
        <Accounts />
        <Spacer size={16} axis={'horizontal'} />
        <RecentTxs />
      </div>
    </div>
  );
};

export default DashboardContents;
