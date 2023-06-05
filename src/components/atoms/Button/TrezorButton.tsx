import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import SelectSignerModal from '~/components/organisms/SelectSignerModal';
import { Logo } from '../Icon';
import { LogoTypes } from '../Icon/Logo';
import { resetLoading, setLoading } from '~/features/loading';
import { trezorActions } from '~/features/tezorWallet';
import { FullAccountType, getFullTrezorAccounts } from '~/service';

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
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const handleIsOpen = () => setIsOpen(!isOpen);

  const handleClick = async () => {
    dispatch(setLoading());
    dispatch(trezorActions.setTrezorAccounts([]));
    setIsOpen(true);

    try {
      const trezorFullAccounts: FullAccountType[] =
        await getFullTrezorAccounts();
      dispatch(trezorActions.setTrezorAccounts(trezorFullAccounts));
      dispatch(resetLoading({ message: '' }));
    } catch (error) {
      setIsOpen(false);
      dispatch(resetLoading({ message: t('walletConnect.error') }));
      throw new Error('Something went wrong, please retry');
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
          type={supportedSignerWallets.TREZOR.logoType as LogoTypes}
          size={'xl'}
          interact={true}
        />
        <span className='text-sm text-textBlack group-hover:text-textWhite mx-4'>
          {supportedSignerWallets.TREZOR.logoName}
        </span>
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
