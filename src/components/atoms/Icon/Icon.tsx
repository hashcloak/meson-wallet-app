import React from 'react'
import AccountCircle from './images/AccountCircle'
import AddExist from './images/AddExist'
import ArrowForward from './images/ArrowForward'
import ArrowNarrowDown from './images/ArrowNarrowDown'
import Avatar from './images/Avatar'
import Bell from './images/Bell'
import Change from './images/Change'
import CheckCircle from './images/CheckCircle'
import ChevronRight from './images/ChevronRight'
import Circle from './images/Circle'
import Close from './images/Close'
import ContentCopy from './images/ContentCopy'
import CreateNew from './images/CreateNew'
import Delete from './images/Delete'
import Edit from './images/Edit'
import FailCircle from './images/FailCircle'
import Info from './images/Info'
import Lines from './images/Lines'
import MesonCircle from './images/MesonCircle'
import MesonLoader from './images/MesonLoader'
import OpenInNew from './images/OpenInNew'
import Visibility from './images/Visibility'
import { theme } from '@/utils/theme'

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
  MesonLoader,
  AccountCircle,
  CreateNew,
  AddExist,
  Lines,
  ArrowNarrowDown,
  Delete,
  Edit,
  ChevronRight,
  Change,
  FailCircle,
  Avatar,
  Visibility,
}

export type IconType = typeof icons
export type IconTypes = keyof IconType

export type IconColor = typeof theme.icons.colors
export type IconColors = keyof IconColor

export type IconSize = typeof theme.icons.sizes
export type IconSizes = keyof IconSize

export type Props = {
  type: IconTypes
  size: IconSizes
  color: IconColors
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
    MesonLoader: <MesonLoader iconSize={size} color={color} />,
    AccountCircle: <AccountCircle iconSize={size} color={color} />,
    CreateNew: <CreateNew iconSize={size} color={color} />,
    AddExist: <AddExist iconSize={size} color={color} />,
    Lines: <Lines iconSize={size} color={color} />,
    ArrowNarrowDown: <ArrowNarrowDown iconSize={size} color={color} />,
    Delete: <Delete iconSize={size} color={color} />,
    Edit: <Edit iconSize={size} color={color} />,
    ChevronRight: <ChevronRight iconSize={size} color={color} />,
    Change: <Change iconSize={size} color={color} />,
    FailCircle: <FailCircle iconSize={size} color={color} />,
    Avatar: <Avatar iconSize={size} color={color} />,
    Visibility: <Visibility iconSize={size} color={color} />,
  }
  return icons[type]
}
