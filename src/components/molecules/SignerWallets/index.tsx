import React, { FC } from 'react';
import { SignerWalletButton } from '~/components/atoms/Button';
import TrezorButton from '~/components/atoms/Button/TrezorButton';
import WalletConnectButton from '~/components/atoms/Button/WalletConnectButton';
import { LogoTypes } from '~/components/atoms/Icon/Logo';

const SignerWallets: FC = () => {
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

  const ledgerConnector = () => console.log('ledger');

  return (
    <>
      {/* Trezor */}
      <TrezorButton />

      {/* Ledger */}
      <SignerWalletButton
        btnType={'button'}
        logoType={supportedSignerWallets.LEDGER.logoType as LogoTypes}
        logoName={supportedSignerWallets.LEDGER.logoName}
        interact={true}
        handleConnect={ledgerConnector}
      />

      {/* WalletConnect */}
      <WalletConnectButton />
    </>
  );
};

export default SignerWallets;
