import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Accounts from '~/components/organisms/Accounts';
import AssetChart from '~/components/organisms/AssetChart';
import Portfolio from '~/components/organisms/Portfolio';
import RecentTxs from '~/components/organisms/RecentTxs';
import Spacer from '~/utils/Spacer';
import { MesonWalletState, setTimestamp } from '~/features/mesonWallet';
import { RootState } from '~/features/reducers';
import { useControlWallet } from '~/hooks/useControlWallet';

const DashboardContents: React.FC = () => {
  const dispatch = useDispatch();
  const mesonWallet = useSelector<RootState, MesonWalletState>(
    (state) => state.mesonWallet
  );
  const { updateWallet } = useControlWallet();


  useEffect(() => {
    dispatch(setTimestamp());
    updateWallet(mesonWallet);
  }, []);

  return (
    <div className='flex flex-col items-center w-full box-border'>
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
