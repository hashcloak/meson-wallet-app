import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import SelectSignerModal from '~/components/organisms/SelectSignerModal';
import { Logo } from '../Icon';
import { LogoTypes } from '../Icon/Logo';
import { ledgerActions } from '~/features/ledgerWallet';
import { resetLoading, setLoading } from '~/features/loading';
import { RootState } from '~/features/reducers';
import { SignerState } from '~/features/signerWallet';
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
  const { wallet } = useSelector<RootState, SignerState>(
    (state) => state.signerWallet
  );
  const [isOpen, setIsOpen] = useState(false);
  const handleIsOpen = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleClick = async () => {
    dispatch(setLoading());
    dispatch(ledgerActions.setLedgerAccounts([]));
    try {
      setIsOpen(true);
      const ledgerFullAccounts: FullAccountType[] =
        await getFullLedgerAccounts();
      dispatch(ledgerActions.setLedgerAccounts(ledgerFullAccounts));
      dispatch(resetLoading({ message: '' }));
      // if(ledgerFullAccounts.length)  setIsOpen(true);
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
        className={`flex flex-row items-center w-48 h-12 px-6 py-2 rounded-xl ${
          wallet === 'Ledger' ? 'bg-dark text-textWhite' : 'bg-bgGrayMid'
        } hover:bg-dark group`}
        onClick={async () => await handleClick()}
      >
        <Logo
          type={supportedSignerWallets.LEDGER.logoType as LogoTypes}
          size={'xl'}
          interact={true}
          isConnected={wallet === 'Ledger'}
        />
        <span
          className={`text-sm ${
            wallet === 'Ledger' ? 'text-textWhite' : 'text-textBlack'
          } group-hover:text-textWhite mx-4`}
        >
          {supportedSignerWallets.LEDGER.logoName}
        </span>
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
