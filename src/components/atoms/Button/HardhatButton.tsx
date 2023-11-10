import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import SelectSignerModal from '~/components/organisms/SelectSignerModal';
import { Logo } from '../Icon';
import { LogoTypes } from '../Icon/Logo';
import { resetLoading, setLoading } from '~/features/loading';
import { RootState } from '~/features/reducers';
import { SignerState } from '~/features/signerWallet';

const HardhatButton: FC = () => {
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
    HARDHAT: {
      logoType: 'HardhatLogo',
      logoName: 'Hardhat',
    },
  };
  const { wallet } = useSelector<RootState, SignerState>(
    (state) => state.signerWallet
  );
  const [isOpen, setIsOpen] = useState(false);
  const handleIsOpen = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleClick = () => {
    dispatch(setLoading());
    try {
      setIsOpen(true);
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
        className={`flex flex-row items-center w-[11.5rem] mx-auto h-12 px-6 py-2 rounded-xl ${
          wallet === 'Hardhat' ? 'bg-dark text-textWhite' : 'bg-bgGrayMid'
        } hover:bg-dark group`}
        onClick={() => handleClick()}
      >
        <Logo
          type={supportedSignerWallets.HARDHAT.logoType as LogoTypes}
          size={'xl'}
          interact={true}
          isConnected={wallet === 'Hardhat'}
        />
        <span
          className={`text-sm ${
            wallet === 'Hardhat' ? 'text-textWhite' : 'text-textBlack'
          } group-hover:text-textWhite mx-4`}
        >
          {supportedSignerWallets.HARDHAT.logoName}
        </span>
      </button>
      <SelectSignerModal
        isOpen={isOpen}
        onClose={handleIsOpen}
        wallet='hardhat'
      />
    </>
  );
};

export default HardhatButton;
