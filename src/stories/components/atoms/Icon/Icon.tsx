import React from 'react'

import AccountCircle from './images/AccountCircle'
import ArrowForward from './images/ArrowForward'
import Bell from './images/Bell'
import CheckCircle from './images/CheckCircle'
import Circle from './images/Circle'
import Close from './images/Close'
import ContentCopy from './images/ContentCopy'
import Info from './images/Info'
import MesonCircle from './images/MesonCircle'
import OpenInNew from './images/OpenInNew'

const icons = {
  ContentCopy,
  CheckCircle,
  Close,
  Circle,
  OpenInNew,
  Info,
  ArrowForward,
  Bell,
  MesonCircle,
  AccountCircle,
}

export type IconType = typeof icons
export type IconTypes = keyof IconType

export type Props = {
  type: IconTypes
  size: 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  color: any
}

export const Icon: React.FC<Props> = ({ type, size, color }) => {
  const icons = {
    CheckCircle: <CheckCircle iconSize={size} color={color} />,
    Close: <Close iconSize={size} color={color} />,
    Info: <Info iconSize={size} color={color} />,
    OpenInNew: <OpenInNew iconSize={size} color={color} />,
    Circle: <Circle iconSize={size} color={color} />,
    ContentCopy: <ContentCopy iconSize={size} color={color} />,
    ArrowForward: <ArrowForward iconSize={size} color={color} />,
    Bell: <Bell iconSize={size} color={color} />,
    MesonCircle: <MesonCircle iconSize={size} color={color} />,
    AccountCircle: <AccountCircle iconSize={size} color={color} />,
  }
  return icons[type]
}
