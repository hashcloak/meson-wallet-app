import Image from 'next/image'
import { useState } from 'react'
import Dialog from '@/components/atoms/Dialog'
import { Icon } from '@/components/atoms/Icon'
import { Option } from '@/components/atoms/Option'
import {
  ConnectedMesonWallet,
  ConnectedMesonWalletBtn,
} from '@/components/organisms/ConnectedMesonWallet'
import {
  ConnectedSignerWallet,
  ConnectedSignerWalletBtn,
} from '@/components/organisms/ConnectedSignerWallet'
import { Notification, NotificationBtn } from '@/components/organisms/Notification'
import SwitchSignerModal from '@/components/organisms/SwitchSignerModal'
import { mockNetworks } from '@/utils/Mock'

const Topbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const handleIsOpen = () => setIsOpen(!isOpen)

  return (
    <div className='flex flex-row justify-between items-center w-full h-[3.5rem] bg-bgDarkLight'>
      <div className='flex flex-row justify-center items-center'>
        <div className='flex justify-center items-center h-10 w-[5.5rem]'>
          <button type='button'>
            <Icon type={'Lines'} size={'md'} color={'white'} />
          </button>
        </div>
        <Image src='/Meson_topbar_logo.png' alt='mesonTopbarLogo' width='176' height='40' />
      </div>
      <div className='flex flex-row justify-center items-center'>
        <Dialog popupBtn={<NotificationBtn />} popupContent={<Notification />} />
        <Dialog
          popupBtn={<ConnectedMesonWalletBtn isConnected={false} />}
          popupContent={<ConnectedMesonWallet isConnected={false} />}
        />
        <Dialog
          popupBtn={
            <ConnectedSignerWalletBtn
              isConnected={true}
              ethAddress='0xfF501B324DC6d78dC9F983f140B9211c3EdB4dc7'
              signerWallet='Trezor'
              network='Ethereum'
            />
          }
          popupContent={
            <ConnectedSignerWallet
              isConnected={true}
              ethAddress='0xfF501B324DC6d78dC9F983f140B9211c3EdB4dc7'
              signerWallet='Trezor'
              network='Ethereum'
              handleIsOpen={handleIsOpen}
            />
          }
        />
        <div className='p-4 border-l-2 border-borderGray'>
          <Option options={mockNetworks} />
        </div>
      </div>
      <SwitchSignerModal isOpen={isOpen} onClose={handleIsOpen} />
    </div>
  )
}

export default Topbar
