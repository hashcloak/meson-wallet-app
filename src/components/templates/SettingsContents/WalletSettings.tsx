import { useState } from 'react';
import { useSelector } from 'react-redux';
import { SidebarIcon } from '~/components/atoms/Icon';
import EditOwners from '~/components/organisms/EditOwners';
import { EthAddress } from '~/utils/Ethereum';
import Spacer from '~/utils/Spacer';
import { MesonWalletState } from '~/features/mesonWallet';
import { NetworkState } from '~/features/network';
import { RootState } from '~/features/reducers';

const WalletSettings: React.FC = () => {
  const [isOpenEditOwner, setIsOpenEditOwner] = useState(false);
  const handleEditOwner = () => setIsOpenEditOwner(!isOpenEditOwner);
  const { walletName, owners, confirmation } = useSelector<RootState, MesonWalletState>(
    (state) => state.mesonWallet
  );
  const { network } = useSelector<RootState, NetworkState>(
    (state) => state.network
  );

  return (
    <div className='flex flex-col w-full rounded-2xl bg-bgDarkLight text-textWhite text-lg px-8 py-4 h-full'>
      <span className='text-3xl font-bold'>Wallet settings</span>
      <Spacer size={24} axis={'vertical'} />
      <div className='flex flex-col'>
        <div className='flex flex-row justify-between items-center px-4 hover:bg-dark rounded-2xl'>
          <div className='flex flex-row'>
            <span className='mr-2'>Wallet name: </span>
            <span>{walletName}</span>
          </div>
          <button type='button'>
            <SidebarIcon type={'Settings'} size={'md'} color={'main'} />
          </button>
        </div>
        <Spacer size={8} axis={'vertical'} />

        <div className='flex flex-row px-4'>
          <span className='mr-2'>Network: </span>
          <span>{network}</span>
        </div>
        <Spacer size={8} axis={'vertical'} />

        <div className='flex flex-col'>
          <div className='flex flex-row justify-between items-center px-4 hover:bg-dark rounded-2xl'>
            <div className='flex flex-row'>
              <span className='mr-2'>Owners: </span>
            </div>
            <button type='button' onClick={() => handleEditOwner()}>
              <SidebarIcon type={'Settings'} size={'md'} color={'main'} />
            </button>
          </div>
          <div className='pl-6'>
            {owners?.map((owner) => (
              <>
                <EthAddress
                  ethAddress={owner.ownerAddress}
                  size={4.5}
                  length={'full'}
                  walletName={owner?.ownerName}
                  key={owner.ownerAddress}
                />
                <Spacer size={8} axis={'vertical'} />
              </>
            ))}
          </div>
        </div>
        <Spacer size={8} axis={'vertical'} />

        <div className='flex flex-row px-4'>
          <span className='mr-2'>Required confirmations: </span>
          <span>{confirmation}</span>
        </div>
      </div>
      <EditOwners
        isOpen={isOpenEditOwner}
        owners={owners ?? []}
        onClose={handleEditOwner}
      />
    </div>
  );
};

export default WalletSettings;
