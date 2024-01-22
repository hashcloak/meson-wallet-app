import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dialog from '~/components/atoms/Dialog';
import { SelectNetwork } from '~/components/atoms/Option';
import {
  ConnectedMesonWallet,
  ConnectedMesonWalletBtn,
} from '~/components/organisms/ConnectedMesonWallet';
import {
  ConnectedSignerWallet,
  ConnectedSignerWalletBtn,
} from '~/components/organisms/ConnectedSignerWallet';
import {
  Notification,
  NotificationBtn,
} from '~/components/organisms/Notification';
import SwitchMesonWallet from '~/components/organisms/SwitchMesonWallet';
import SwitchSignerModal from '~/components/organisms/SwitchSignerModal';
import { NetworkState } from '~/features/network';
import { RootState } from '~/features/reducers';
import { SignerState } from '~/features/signerWallet';

const Topbar: FC = () => {
  const { signerWalletAddress, isConnected, wallet } = useSelector<
    RootState,
    SignerState
  >((state) => state.signerWallet);

  const { network } = useSelector<RootState, NetworkState>(
    (state) => state.network
  );

  const [isOpen, setIsOpen] = useState(false);
  const handleIsOpen = () => setIsOpen(!isOpen);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {}, [isConnected]);

  return (
    <div className='flex flex-row justify-between items-center w-full h-[3.5rem] bg-bgGrayLight  dark:bg-bgDarkLight'>
      <div className='flex flex-row justify-center items-center'>
        <SwitchMesonWallet />
        <Link to='/' className='w-full ml-[8rem]'>
          <img
            src='/assets/Meson_topbar_logo.png'
            alt='Meson Logo'
            width='176'
            height='40'
          />
        </Link>
      </div>
      <div className='flex flex-row justify-center items-center'>
        <Dialog
          popupBtn={<NotificationBtn />}
          popupContent={<Notification />}
        />
        <Dialog
          popupBtn={<ConnectedMesonWalletBtn isConnected={isConnected} />}
          popupContent={<ConnectedMesonWallet isConnected={isConnected} />}
        />
        <Dialog
          popupBtn={
            <ConnectedSignerWalletBtn
              isConnected={isConnected}
              ethAddress={signerWalletAddress || ''}
              signerWallet={wallet ?? 'Unsupported'}
              network={network.charAt(0).toUpperCase() + network.slice(1)}
            />
          }
          popupContent={
            <ConnectedSignerWallet
              isConnected={isConnected}
              ethAddress={signerWalletAddress || ''}
              signerWallet={wallet ?? 'Unsupported'}
              network={network.charAt(0).toUpperCase() + network.slice(1)}
              handleIsOpen={handleIsOpen}
            />
          }
        />
        <div className='p-4 border-l-2 border-borderGray'>
          <SelectNetwork />
        </div>
      </div>
      <SwitchSignerModal isOpen={isOpen} onClose={handleIsOpen} />
    </div>
  );
};

export default Topbar;
