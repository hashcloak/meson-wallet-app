import React from 'react';

import AccountCreated from './images/AccountCreated';
import Conflict from './images/Conflict';
import OnChainRejection from './images/OnChainRejection';
import OwnerChange from './images/OwnerChange';
import Receive from './images/Receive';
import Send from './images/Send';
import Warning from './images/Warning';

import { theme } from '~/utils/theme';

const statusIcons = {
  Send,
  Receive,
  Conflict,
  OwnerChange,
  OnChainRejection,
  Warning,
  AccountCreated,
};

export type StatusIconType = typeof statusIcons;
export type StatusIconTypes = keyof StatusIconType;

export type IconColor = typeof theme.icons.colors;
export type IconColors = keyof IconColor;

export type Props = {
  type: StatusIconTypes;
  size: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | '5xl';
  color: IconColors;
};

export const StatusIcon: React.FC<Props> = ({ type, size, color }) => {
  const statusIcons = {
    Send: <Send iconSize={size} color={color} />,
    Receive: <Receive iconSize={size} color={color} />,
    Conflict: <Conflict iconSize={size} color={color} />,
    OwnerChange: <OwnerChange iconSize={size} color={color} />,
    OnChainRejection: <OnChainRejection iconSize={size} color={color} />,
    Warning: <Warning iconSize={size} color={color} />,
    AccountCreated: <AccountCreated iconSize={size} color={color} />,
  };

  return statusIcons[type];
};
