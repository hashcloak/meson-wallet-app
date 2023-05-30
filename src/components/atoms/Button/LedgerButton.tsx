import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import SelectSignerModal from '~/components/organisms/SelectSignerModal';
import { Logo } from '../Icon';
import { LogoTypes } from '../Icon/Logo';
import Spinner from '../Spinner';
import { ledgerActions } from '~/features/ledgerWallet';
import { FullAccountType, getFullLedgerAccounts } from '~/service';

const LedgerButton: FC = () => {
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
  const [isLoading, setIsLoading] = useState(false);
  const handleIsOpen = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();

  const handleClick = async () => {
    setIsLoading(true);
    dispatch(ledgerActions.setLedgerAccounts([]));
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const ledgerFullAccounts: FullAccountType[] =
        await getFullLedgerAccounts();
      dispatch(ledgerActions.setLedgerAccounts(ledgerFullAccounts));
    } catch (error) {
      throw new Error('Something went wrong, please retry');
    } finally {
      setIsLoading(false);
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      <button
        type='button'
        className='flex flex-row items-center w-48 h-12 px-6 py-2 rounded-xl bg-bgGrayMid hover:bg-dark group'
        onClick={async () => await handleClick()}
      >
        <Logo
          type={supportedSignerWallets.LEDGER.logoType as LogoTypes}
          size={'xl'}
          interact={true}
        />
        {isLoading ? (
          <div className='w-full text-center'>
            <Spinner size='sm' />
          </div>
        ) : (
          <span className='text-sm text-textBlack group-hover:text-textWhite mx-4'>
            {supportedSignerWallets.LEDGER.logoName}
          </span>
        )}
      </button>
      <SelectSignerModal
        isOpen={isOpen}
        onClose={handleIsOpen}
        wallet='ledger'
      />
    </>
  );
};

export default LedgerButton;
