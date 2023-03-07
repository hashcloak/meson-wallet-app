import React from 'react'

import { Icon, IconTypes } from './Icon'
import { Logo, LogoTypes } from './Logo'
import { SidebarIcon, SidebarIconTypes } from './SidebarIcon'

import { DisplayBox } from '~/utils/DisplayBox'

export default {
  title: 'Components/Atmos/Icons',
  component: { Icon, SidebarIcon },
  argTypes: {
    size: {
      options: ['sm', 'md'],
      control: { type: 'radio' },
    },
  },
}

export const Icons = (): React.ReactElement => {
  const icons: IconTypes[] = [
    'CheckCircle',
    'FailCircle',
    'Close',
    'Info',
    'OpenInNew',
    'Circle',
    'ContentCopy',
    'ArrowForward',
    'Bell',
    'MesonCircle',
    'AccountCircle',
    'Send',
    'Receive',
    'Conflict',
    'OwnerChange',
    'OnChainRejection',
    'CreateNew',
    'AddExist',
    'Lines',
    'ArrowNarrowDown',
    'Delete',
    'Edit',
    'Change',
    'ChevronRight',
  ]
  return (
    <div className='flex flex-row w-screen flex-wrap'>
      <DisplayBox title={'Small'}>
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
      </DisplayBox>

      <DisplayBox title={'Medium'}>
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
      </DisplayBox>

      <DisplayBox title={'Large'}>
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
      </DisplayBox>
    </div>
  )
}

export const SidebarIcons = (): React.ReactElement => {
  const icons: SidebarIconTypes[] = [
    'Home',
    'Transactions',
    'Contacts',
    'Settings',
    'Help',
    'NewTx',
    'AddCircle',
  ]
  return (
    <div className='flex flex-row w-screen flex-wrap'>
      <DisplayBox title={'Sidebar'}>
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
      </DisplayBox>
    </div>
  )
}

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
  ]

  return (
    <div className='flex flex-row w-screen flex-wrap'>
      <DisplayBox title={'Small'}>
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
      </DisplayBox>

      <DisplayBox title={'Medium'}>
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
      </DisplayBox>

      <DisplayBox title={'Large'}>
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
      </DisplayBox>
    </div>
  )
}
