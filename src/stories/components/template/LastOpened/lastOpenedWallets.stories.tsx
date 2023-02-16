import LastOpenedWallet from './LastOpenedWallet'

import Spacer from '~/utils/Spacer'

export default {
  title: 'Components/Template/LastOpenedWallet',
  component: LastOpenedWallet,
}

export const LastOpenedWallets = () => {
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
  return (
    <div className='flex flex-col justify-between w-screen'>
      <LastOpenedWallet wallets={wallets} />
    </div>
  )
}
