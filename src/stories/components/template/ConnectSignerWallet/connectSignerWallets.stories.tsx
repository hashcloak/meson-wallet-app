import ConnectSignerWallet from './ConnectSignerWallet'

import Spacer from '~/utils/Spacer'

export default {
  title: 'Components/Template/ConnectSignerWallet',
  component: ConnectSignerWallet,
}

export const ConnectSignerWallets = () => {
  return (
    <div className='flex flex-col justify-between w-screen'>
      <ConnectSignerWallet />
    </div>
  )
}
