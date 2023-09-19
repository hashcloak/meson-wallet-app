import React from 'react';
import { IconColors } from '~/components/atoms/Icon/Icon';
import AccountCreated from '~/components/atoms/Icon/images/AccountCreated';
import Conflict from '~/components/atoms/Icon/images/Conflict';
import OnChainRejection from '~/components/atoms/Icon/images/OnChainRejection';
import OwnerChange from '~/components/atoms/Icon/images/OwnerChange';
import Receive from '~/components/atoms/Icon/images/Receive';
import Send from '~/components/atoms/Icon/images/Send';
import Spacer from '~/utils/Spacer';

const icons = {
  Send,
  Receive,
  Conflict,
  OwnerChange,
  OnChainRejection,
};

export type IconType = typeof icons;
export type IconTypes = keyof IconType;

const statuses = {
  Send: 'Send',
  Sent: 'Sent',
  Receive: 'Receive',
  Received: 'Received',
  OwnerChange: 'Owner change',
  OnChainRejection: 'On-chain rejection',
  AccountCreated: 'Account created',
  Conflict: 'Some transactions conflict as they use the same nonce.',
};

export type StatusType = typeof statuses;
export type StatusTypes = keyof StatusType;

export type Props = {
  type: IconTypes | StatusTypes;
  size: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  color: IconColors;
  status?: StatusTypes;
};

const TxStatus: React.FC<Props> = ({ type, size, color, status }) => {
  const icons = {
    Send: <Send iconSize={size} color={color} />,
    Sent: <Send iconSize={size} color={color} />,
    Receive: <Receive iconSize={size} color={color} />,
    Received: <Receive iconSize={size} color={color} />,
    Conflict: <Conflict iconSize={size} color={color} />,
    OwnerChange: <OwnerChange iconSize={size} color={color} />,
    OnChainRejection: <OnChainRejection iconSize={size} color={color} />,
    AccountCreated: <AccountCreated iconSize={size} color={color} />,
  };

  return (
    <div className='flex flex-row justify-center items-center'>
      {icons[type]}
      <Spacer size={8} axis={'horizontal'} />
      <span
        className={`text-textWhite font-bold whitespace-nowrap ${
          status === 'OnChainRejection' ? 'text-sm' : 'text-base'
        }`}
      >
        {status && statuses[status]}
      </span>
    </div>
  );
};

export default TxStatus;
