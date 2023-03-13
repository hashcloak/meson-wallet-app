import Dialog from '../../atoms/Dialog/Dialog'

import {
  ConnectedMesonWallet,
  ConnectedMesonWalletBtn,
} from './ConnectedMesonWallet'

export default {
  title: 'Components/Organisms/ConnectedMesonWallet',
  component: ConnectedMesonWallet,
}

export const ConnectedMesonWallets = (): React.ReactElement => {
  const mesonAddress = '0x7bbe9EEc7a61Ac4E655ffEFed478d5F833181422'

  return (
    <div className='flex flex-row w-screen flex-wrap'>
      <div className='flex flex-row flex-wrap w-full mt-8'>
        <Dialog
          popupBtn={<ConnectedMesonWalletBtn isConnected={false} />}
          popupContent={<ConnectedMesonWallet isConnected={false} />}
        />
      </div>
      <div className='flex flex-row flex-wrap w-full mt-8'>
        <Dialog
          popupBtn={
            <ConnectedMesonWalletBtn
              isConnected={true}
              ethAddress={mesonAddress}
            />
          }
          popupContent={
            <ConnectedMesonWallet
              isConnected={true}
              ethAddress={mesonAddress}
            />
          }
        />
      </div>
    </div>
  )
}
