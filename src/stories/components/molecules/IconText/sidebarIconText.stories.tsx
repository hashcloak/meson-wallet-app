import React from 'react'

import { LogoTypes } from '../../atoms/Icon/Logo'
import { SidebarIconTypes } from '../../atoms/Icon/SidebarIcon'

import { SidebarIconText } from './SidebarIconText'
import { Token } from './Token'

export default {
  title: 'Components/Molecules/SidebarIconTexts',
  component: SidebarIconText,
}

export const SidebarIconTexts = (): React.ReactElement => {
  const icons: SidebarIconTypes[] = [
    'Home',
    'Transactions',
    'Contacts',
    'Settings',
    'Help',
    'NewTx',
    'AddCircle',
  ]
  const texts = {
    Home: 'Home',
    Transactions: 'Transactions',
    Contacts: 'Contacts',
    Settings: 'Settings',
    Help: 'Help',
    NewTx: 'NewTx',
    AddCircle: 'Add New',
  }

  return (
    <div className='flex flex-row w-screen flex-wrap'>
      {/* <DisplayBox title={'Sidebar'}> */}
      <div className='flex flex-col justify-evenly'>
        {icons.map((type) => (
          <SidebarIconText type={type} key={type} text={texts[type]} />
        ))}
      </div>
      {/* </DisplayBox> */}
    </div>
  )
}
export const Tokens = (): React.ReactElement => {
  const tokens: LogoTypes[] = ['EthLogo', 'DaiLogo', 'UsdcLogo', 'BnbLogo']
  const abbrev = {
    EthLogo: 'ETH',
    DaiLogo: 'DAI',
    UsdcLogo: 'USDC',
    BnbLogo: 'BNB',
  }
  const name = {
    EthLogo: 'Ethereum',
    DaiLogo: 'Dai Stablecoin',
    UsdcLogo: 'USD Coin',
    BnbLogo: 'BNB Smart Chain',
  }
  return (
    <div className='flex flex-row w-screen flex-wrap'>
      {/* <DisplayBox title={'Sidebar'}> */}
      <div className='flex flex-col justify-start'>
        {tokens.map((token) => (
          <Token
            type={token}
            abbrev={abbrev[token]}
            token={name[token]}
            key={token}
          />
        ))}
      </div>
      {/* </DisplayBox> */}
    </div>
  )
}
