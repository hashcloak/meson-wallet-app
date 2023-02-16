import React from 'react'

import Button from '../../atoms/Button/Button'
import { Logo } from '../../atoms/Icon/Logo'
import IconText from '../../molecules/IconText/IconText'
import LastOpenedWallet from '../../template/LastOpened/LastOpenedWallet'
import Topbar from '../../template/Topbar/Topbar'

import Spacer from '~/utils/Spacer'

const wallets = [
  {
    id: 1,
    walletName: 'My wallet',
    ethAddress: '0x7bbe9EEc7a61Ac4E655ffEFed478d5F833181422',
    lastOpened: 1674012686,
  },
  {
    id: 2,
    walletName: 'Sample wallet2',
    ethAddress: '0x7bbe9EEc7a61Ac4E655ffEFed478d5F833181422',
    lastOpened: 1649565211,
  },
  {
    id: 6,
    walletName: 'Sample wallet6',
    ethAddress: '0x7bbe9EEc7a61Ac4E655ffEFed478d5F833181422',
    lastOpened: 1674011500,
  },
  {
    id: 3,
    walletName: 'Sample wallet4',
    ethAddress: '0x7bbe9EEc7a61Ac4E655ffEFed478d5F833181422',
    lastOpened: 1660970011,
  },
  {
    id: 5,
    walletName: 'Sample wallet3',
    ethAddress: '0x7bbe9EEc7a61Ac4E655ffEFed478d5F833181422',
    lastOpened: 1665376411,
  },
  {
    id: 4,
    walletName: 'Sample wallet',
    ethAddress: '0x7bbe9EEc7a61Ac4E655ffEFed478d5F833181422',
    lastOpened: 1662784411,
  },
]

const Start = () => {
  return (
    <div className='w-screen h-screen flex flex-col'>
      <Topbar />

      <div className='flex flex-col justify-center items-center w-full h-full box-border py-8 px-[4.5rem] bg-bgDark'>
        <img
          src='./Meson_start_logo.png'
          alt='mesonStartLogo'
          className='w-[11rem] object-contain'
        />
        <Spacer size={16} axis={'vertical'} />
        <LastOpenedWallet wallets={wallets} />
        <Spacer size={16} axis={'vertical'} />
        <div className='flex flex-row justify-between items-center w-[51rem] '>
          <Button btnVariant={'special'} btnSize={'sp'} btnType={'button'}>
            <IconText iconType={'CreateNew'} iconColor={'white'}>
              Create new wallet
            </IconText>
          </Button>
          <Button btnVariant={'special'} btnSize={'sp'} btnType={'button'}>
            <IconText iconType={'AddExist'} iconColor={'white'}>
              Add existing wallet
            </IconText>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Start
