import React from 'react'
import { SignerWalletButton } from '@/components/atoms/Button'
import { LogoTypes } from '@/components/atoms/Icon/Logo'

const SignerWallets = () => {
  const signerWallets: { [k in LogoTypes]?: string }[] = [
    { TrezorLogo: 'Trezor' },
    { WalletConnectLogo: 'WalletConnect' },
    { LedgerLogo: 'Ledger' },
    { MetamaskLogo: 'Metamask' },
  ]

  return (
    <>
      {signerWallets.map((wallet) => (
        <SignerWalletButton
          btnType={'button'}
          logoType={Object.keys(wallet)[0] as LogoTypes}
          logoName={Object.values(wallet)[0]}
          interact={true}
          key={Object.keys(wallet)[0]}
        />
      ))}
    </>
  )
}

export default SignerWallets
