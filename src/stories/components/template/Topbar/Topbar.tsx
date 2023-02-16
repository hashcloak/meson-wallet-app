import Dialog from '../../atoms/Dialog/Dialog'
import { Icon } from '../../atoms/Icon/Icon'
import Option from '../../atoms/Option/Option'
import { mock } from '../../atoms/Option/options.stories'
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

const Topbar = () => {
  return (
    <div className='flex flex-row justify-between items-center w-full h-[3.5rem] bg-bgDarkLight'>
      <div className='flex flex-row justify-center items-center'>
        <button
          className='flex justify-center items-center h-10 w-[4.5rem]'
          type='button'
        >
          <Icon type={'Lines'} size={'md'} color={'white'} />
        </button>
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
          <Option options={mock} />
        </div>
      </div>
    </div>
  )
}

export default Topbar
