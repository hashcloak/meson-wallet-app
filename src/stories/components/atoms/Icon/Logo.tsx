import React from 'react'

import BnbLogo from './images/BnbLogo'
import DaiLogo from './images/DaiLogo'
import EthLogo from './images/EthLogo'
import LedgerLogo from './images/LedgerLogo'
import MetamaskLogo from './images/MetamaskLogo'
import TrezorLogo from './images/TrezorLogo'
import UsdcLogo from './images/UsdcLogo'
import WalletConnectLogo from './images/WalletConnectLogo'

const icons = {
  EthLogo,
  DaiLogo,
  UsdcLogo,
  BnbLogo,
  TrezorLogo,
  WalletConnectLogo,
  LedgerLogo,
  MetamaskLogo,
}

export type LogoType = typeof icons
export type LogoTypes = keyof LogoType

export type Props = {
  type: LogoTypes
  size: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | '5xl'
  interact?: boolean
}

export const Logo: React.FC<Props> = ({ type, size, interact = false }) => {
  const logos = {
    EthLogo: <EthLogo iconSize={size} />,
    DaiLogo: <DaiLogo iconSize={size} />,
    UsdcLogo: <UsdcLogo iconSize={size} />,
    BnbLogo: <BnbLogo iconSize={size} />,
    TrezorLogo: <TrezorLogo iconSize={size} interact={interact} />,
    WalletConnectLogo: (
      <WalletConnectLogo iconSize={size} interact={interact} />
    ),
    LedgerLogo: <LedgerLogo iconSize={size} interact={interact} />,
    MetamaskLogo: <MetamaskLogo iconSize={size} />,
  }
  return logos[type]
}
