import React from 'react'
import { SignerWalletButton } from '@/components/atoms/Button'
import WalletConnectButton from '@/components/atoms/Button/WalletConnectButton.tsx'
import { LogoTypes } from '@/components/atoms/Icon/Logo'
import { useConnectWC } from '@/hooks/wagumi/useConnectWC'
import { supportedSignerWallets } from '@/utils/supportedSignerWallets'

const SignerWallets = () => {
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
  }

  const trezorConnector = () => console.log('trezor')
  const ledgerConnector = () => console.log('ledger')
  const { walletConnectConnector, address, isConnected } = useConnectWC()

  return (
    <>
      {/* Trezor */}
      <SignerWalletButton
        btnType={'button'}
        logoType={supportedSignerWallets.TREZOR.logoType as LogoTypes}
        logoName={supportedSignerWallets.TREZOR.logoName}
        interact={true}
        handleConnect={trezorConnector}
      />

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
  )
}

export default SignerWallets
