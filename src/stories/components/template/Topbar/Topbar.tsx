import Dialog from '../../atoms/Dialog/Dialog'
import { Icon } from '../../atoms/Icon/Icon'
import Option from '../../atoms/Option/Option'
import {
  ConnectedMesonWallet,
  ConnectedMesonWalletBtn,
} from '../../organisms/ConnectedMesonWallet/ConnectedMesonWallet'
import {
  ConnectedSignerWallet,
  ConnectedSignerWalletBtn,
} from '../../organisms/ConnectedSignerWallet/ConnectedSignerWallet'
import {
  Notification,
  NotificationBtn,
} from '../../organisms/Notification/Notification'

import { mockNetworks } from '~/stories/utils/Mock'

const Topbar = () => {
  return (
    <div className='flex flex-row justify-between items-center w-full h-[3.5rem] bg-bgDarkLight'>
      <div className='flex flex-row justify-center items-center'>
        <div className='flex justify-center items-center h-10 w-[5.5rem]'>
          <button type='button'>
            <Icon type={'Lines'} size={'md'} color={'white'} />
          </button>
        </div>
        <img
          src='./Meson_topbar_logo.png'
          alt='mesonTopbarLogo'
          className='object-contain h-10 w-[11rem]'
        />
      </div>
      <div className='flex flex-row justify-center items-center'>
        <Dialog
          popupBtn={<NotificationBtn />}
          popupContent={<Notification />}
        />
        <Dialog
          popupBtn={<ConnectedMesonWalletBtn isConnected={false} />}
          popupContent={<ConnectedMesonWallet isConnected={false} />}
        />
        <Dialog
          popupBtn={<ConnectedSignerWalletBtn isConnected={false} />}
          popupContent={<ConnectedSignerWallet isConnected={false} />}
        />
        <div className='p-4 border-l-2 border-borderGray'>
          <Option options={mockNetworks} />
        </div>
      </div>
    </div>
  )
}

export default Topbar
