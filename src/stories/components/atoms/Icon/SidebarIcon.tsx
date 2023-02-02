import React from 'react'

import AddCircle from './images/AddCircle'
import Contacts from './images/Contacts'
import Help from './images/Help'
import Home from './images/Home'
import NewTx from './images/NewTx'
import Settings from './images/Settings'
import Transactions from './images/Transactions'

const icons = {
  Home,
  Transactions,
  Contacts,
  Settings,
  Help,
  NewTx,
  AddCircle,
}

export type SidebarIconType = typeof icons
export type SidebarIconTypes = keyof SidebarIconType

export type Props = {
  type: SidebarIconTypes
  size: 'sm' | 'md' | 'lg' | 'xl'
  color: any
}

export const SidebarIcon: React.FC<Props> = ({ type, size, color }) => {
  const icons = {
    Home: <Home iconSize={size} color={color} />,
    Transactions: <Transactions iconSize={size} color={color} />,
    Contacts: <Contacts iconSize={size} color={color} />,
    Settings: <Settings iconSize={size} color={color} />,
    Help: <Help iconSize={size} color={color} />,
    NewTx: <NewTx iconSize={size} color={color} />,
    AddCircle: <AddCircle iconSize={size} color={color} />,
  }
  return icons[type]
}
