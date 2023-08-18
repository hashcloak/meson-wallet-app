import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Accounts from '~/components/organisms/Accounts';
import AssetChart from '~/components/organisms/AssetChart';
import Portfolio from '~/components/organisms/Portfolio';
import RecentTxs from '~/components/organisms/RecentTxs';
import Spacer from '~/utils/Spacer';
import { MesonWalletState } from '~/features/mesonWallet';
import { RootState } from '~/features/reducers';
import { getLocalHistoricalTxs } from '~/service';

const DashboardContents: React.FC = () => {
  const { mesonWallet } = useSelector<RootState, MesonWalletState>(
    (state) => state.mesonWallet
  );

  useEffect(() => {
    console.log();
    const load = async () => {
      await getLocalHistoricalTxs(mesonWallet?.address);
    };
    void load();
  }, []);

  return (
    <div className='flex flex-col  items-center w-full box-border'>
      <div className='flex xl:flex-row gap-4 xl:gap-0 flex-col w-full h-full box-border xl:justify-between min-w-[46rem] overflow-scroll'>
        <AssetChart />
        <Spacer size={16} axis={'horizontal'} />
        <Portfolio />
      </div>
      <Spacer size={16} axis={'vertical'} />
      <div className='flex xl:flex-row gap-4 xl:gap-0 flex-col w-full h-full box-border xl:justify-between min-w-[46rem] overflow-scroll'>
        <Accounts />
        <Spacer size={16} axis={'horizontal'} />
        <RecentTxs />
      </div>
    </div>
  );
};

export default DashboardContents;
