import React from 'react'

import { SidebarIconTypes } from '../../atoms/Icon/SidebarIcon'

import { SidebarIconText } from './SidebarIconText'
import { Token, tokens } from './Token'

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
  const abbrev = {
    EthLogo: 'ETH',
    DaiLogo: 'DAI',
    UsdcLogo: 'USDC',
    BnbLogo: 'BNB',
  }

  const tokenName = {
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
            token={tokenName[token]}
            key={token}
          />
        ))}
      </div>
      {/* </DisplayBox> */}
    </div>
  )
}
