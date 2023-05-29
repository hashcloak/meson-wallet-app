import { FC, useState } from 'react';
import SelectSignerModal from '~/components/organisms/SelectSignerModal';
import { Logo } from '../Icon';
import { LogoTypes } from '../Icon/Logo';
import Spinner from '../Spinner';

import { useConnectTrezor } from '~/hooks/wagumi/useConnectTrezor';

const TrezorButton: FC = () => {
  const supportedSignerWallets = {
    TREZOR: {
      logoType: 'TrezorLogo',
      logoName: 'Trezor',
    },
    LEDGER: {
      logoType: 'LedgerLogo',
      logoName: 'Ledger',
    },
    WALLETCONNECT: {
      logoType: 'WalletConnectLogo',
      logoName: 'WalletConnect',
    },
  };
  const [isOpen, setIsOpen] = useState(false);
  const handleIsOpen = () => setIsOpen(!isOpen);

  const { isLoading } = useConnectTrezor();

  return (
    <>
      <button
        type='button'
        className='flex flex-row items-center w-48 h-12 px-6 py-2 rounded-xl bg-bgGrayMid hover:bg-dark group'
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <Logo
          type={supportedSignerWallets.TREZOR.logoType as LogoTypes}
          size={'xl'}
          interact={true}
        />
        {isLoading ? (
          <div className='w-full text-center'>
            <Spinner size='sm' />
          </div>
        ) : (
          <span className='text-sm text-textBlack group-hover:text-textWhite mx-4'>
            {supportedSignerWallets.TREZOR.logoName}
          </span>
        )}
      </button>
      <SelectSignerModal
        isOpen={isOpen}
        onClose={handleIsOpen}
        wallet={'trezor'}
      />
    </>
  );
};

export default TrezorButton;
