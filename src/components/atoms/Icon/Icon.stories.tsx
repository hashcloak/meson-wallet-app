import React from 'react';

import { IconTypes } from './Icon';
import { LogoTypes } from './Logo';
import { SidebarIconTypes } from './SidebarIcon';
import { StatusIconTypes } from './StatusIcon';
import { Icon, SidebarIcon, Logo, StatusIcon } from '.';

export default {
  title: 'Components/Atmos/Icon',
  component: { Icon, SidebarIcon, Logo, StatusIcon },
  argTypes: {
    size: {
      options: ['sm', 'md'],
      control: { type: 'radio' },
    },
  },
};

export const Icons = (): React.ReactElement => {
  const icons: IconTypes[] = [
    'CheckCircle',
    'Close',
    'Info',
    'OpenInNew',
    'Circle',
    'ContentCopy',
    'ArrowForward',
    'Bell',
    'MesonCircle',
    'MesonLoader',
    'AccountCircle',
    'CreateNew',
    'AddExist',
    'Lines',
    'ArrowNarrowDown',
    'Delete',
    'Edit',
    'Change',
    'ChevronRight',
    'FailCircle',
    'Avatar',
    'Visibility',
  ];

  return (
    <div className='flex flex-row w-screen flex-wrap'>
      <div className='flex flex-row justify-evenly flex-wrap'>
        {icons.map((type) => (
          <div
            className='flex flex-col items-center justify-center border border-solid border-borderGray rounded-sm p-4 w-32 h-32'
            key={type}
          >
            <Icon type={type} size={'sm'} color={'main'} />
            <p className='mt-4 text-textGray'>{type}</p>
          </div>
        ))}
      </div>

      <div className='flex flex-row justify-evenly flex-wrap'>
        {icons.map((type) => (
          <div
            className='flex flex-col items-center justify-center border border-solid border-borderGray rounded-sm p-4 w-32 h-32'
            key={type}
          >
            <Icon type={type} size={'md'} color={'main'} />
            <p className='mt-4 text-textGray'>{type}</p>
          </div>
        ))}
      </div>

      <div className='flex flex-row justify-evenly flex-wrap'>
        {icons.map((type) => (
          <div
            className='flex flex-col items-center justify-center border border-solid border-borderGray rounded-sm p-4 w-32 h-32'
            key={type}
          >
            <Icon type={type} size={'lg'} color={'main'} />
            <p className='mt-4 text-textGray'>{type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SidebarIcons = (): React.ReactElement => {
  const icons: SidebarIconTypes[] = [
    'Home',
    'Transactions',
    'Contacts',
    'Settings',
    'Help',
    'NewTx',
    'AddCircle',
  ];

  return (
    <div className='flex flex-row w-screen flex-wrap'>
      <div className='flex flex-row justify-evenly flex-wrap'>
        {icons.map((type) => (
          <div
            className='flex flex-col items-center justify-center border border-solid border-borderGray rounded-sm p-4 w-32 h-32'
            key={type}
          >
            <SidebarIcon type={type} size={'md'} color={'white'} />
            <p className='mt-4 text-textGray'>{type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Logos = (): React.ReactElement => {
  const logos: LogoTypes[] = [
    'EthLogo',
    'DaiLogo',
    'UsdcLogo',
    'BnbLogo',
    'TrezorLogo',
    'WalletConnectLogo',
    'LedgerLogo',
    'MetamaskLogo',
  ];

  return (
    <div className='flex flex-row w-screen flex-wrap'>
      <div className='flex flex-row justify-evenly flex-wrap'>
        {logos.map((type) => (
          <div
            className='flex flex-col items-center justify-center border border-solid border-borderGray rounded-sm p-4 w-32 h-32'
            key={type}
          >
            <Logo type={type} size={'sm'} />
            <p className='mt-4 text-textGray'>{type}</p>
          </div>
        ))}
      </div>

      <div className='flex flex-row justify-evenly flex-wrap'>
        {logos.map((type) => (
          <div
            className='flex flex-col items-center justify-center border border-solid border-borderGray rounded-sm p-4 w-32 h-32'
            key={type}
          >
            <Logo type={type} size={'md'} />
            <p className='mt-4 text-textGray'>{type}</p>
          </div>
        ))}
      </div>

      <div className='flex flex-row justify-evenly flex-wrap'>
        {logos.map((type) => (
          <div
            className='flex flex-col items-center justify-center border border-solid border-borderGray rounded-sm p-4 w-32 h-32'
            key={type}
          >
            <Logo type={type} size={'lg'} />
            <p className='mt-4 text-textGray'>{type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const StatusIcons = (): React.ReactElement => {
  const statusIcons: StatusIconTypes[] = [
    'Send',
    'Receive',
    'Conflict',
    'OwnerChange',
    'OnChainRejection',
    'Warning',
    'AccountCreated',
  ];

  return (
    <div className='flex flex-row justify-evenly flex-wrap'>
      {statusIcons.map((type) => (
        <div
          className='flex flex-col items-center justify-center border border-solid border-borderGray rounded-sm p-4 w-32 h-32 bg-bgDarkMid'
          key={type}
        >
          <StatusIcon type={type} size={'lg'} color={'white'} />
          <p className='mt-4 text-textGray'>{type}</p>
        </div>
      ))}
    </div>
  );
};
