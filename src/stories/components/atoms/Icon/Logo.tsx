import React from 'react'

import BnbLogo from './images/BnbLogo'
import DaiLogo from './images/DaiLogo'
import EthLogo from './images/EthLogo'
import UsdcLogo from './images/UsdcLogo'

const icons = {
  EthLogo,
  DaiLogo,
  UsdcLogo,
  BnbLogo,
}

export type LogoType = typeof icons
export type LogoTypes = keyof LogoType

export type Props = {
  type: LogoTypes
  size: 'sm' | 'md' | 'lg' | 'xl'
}

export const Logo: React.FC<Props> = ({ type, size }) => {
  const logos = {
    EthLogo: <EthLogo iconSize={size} />,
    DaiLogo: <DaiLogo iconSize={size} />,
    UsdcLogo: <UsdcLogo iconSize={size} />,
    BnbLogo: <BnbLogo iconSize={size} />,
  }
  return logos[type]
}
