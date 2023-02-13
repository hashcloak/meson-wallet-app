import {
  ConnectedMesonWallet,
  ConnectedMesonWalletBtn,
} from '../../Organisms/ConnectedMesonWallet/ConnectedMesonWallet'
import {
  ConnectedSignerWallet,
  ConnectedSignerWalletBtn,
} from '../../Organisms/ConnectedSignerWallet/ConnectedSignerWallet'
import {
  Notification,
  NotificationBtn,
} from '../../Organisms/Notification/Notification'

import Dialog from './Dialog'

export default {
  title: 'Components/Dialogs',
  component: Dialog,
  argTypes: { onClick: { action: 'clicked' } },
}

export const Dialogs = (): React.ReactElement => {
  const mesonAddress = '0x7bbe9EEc7a61Ac4E655ffEFed478d5F833181422'
  const signerAddress = '0xfF501B324DC6d78dC9F983f140B9211c3EdB4dc7'
  const selectedSignerWallet = 'Metamask'
  const isConnected = [false, true]
  const network = 'Ethereum'

  return (
    <div className='flex flex-row w-screen flex-wrap'>
      {isConnected.map((isConnected, idx) => (
        <div className='flex flex-row flex-wrap w-full mt-8' key={idx}>
          <Dialog
            popupBtn={<NotificationBtn />}
            popupContent={<Notification />}
          />
          <Dialog
            popupBtn={
              <ConnectedMesonWalletBtn
                isConnected={isConnected}
                ethAddress={mesonAddress}
              />
            }
            popupContent={
              <ConnectedMesonWallet
                isConnected={isConnected}
                ethAddress={mesonAddress}
              />
            }
          />
          <Dialog
            popupBtn={
              <ConnectedSignerWalletBtn
                isConnected={isConnected}
                ethAddress={signerAddress}
                signerWallet={selectedSignerWallet}
                network={network}
              />
            }
            popupContent={
              <ConnectedSignerWallet
                isConnected={isConnected}
                ethAddress={signerAddress}
                signerWallet={selectedSignerWallet}
                network={network}
              />
            }
          />
        </div>
      ))}
    </div>
  )
}