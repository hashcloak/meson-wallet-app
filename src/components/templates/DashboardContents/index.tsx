import Accounts from '~/components/organisms/Accounts';
import AssetChart from '~/components/organisms/AssetChart';
import Portfolio from '~/components/organisms/Portfolio';
import RecentTxs from '~/components/organisms/RecentTxs';
import Spacer from '~/utils/Spacer';

const DashboardContents: React.FC = () => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full box-border'>
      <div className='flex flex-row w-full h-full box-border'>
        <AssetChart />
        <Spacer size={16} axis={'horizontal'} />
        <Portfolio />
      </div>
      <Spacer size={16} axis={'vertical'} />
      <div className='flex flex-row w-full h-full box-border'>
        <Accounts />
        <Spacer size={16} axis={'horizontal'} />
        <RecentTxs />
      </div>
    </div>
  );
};

export default DashboardContents;
