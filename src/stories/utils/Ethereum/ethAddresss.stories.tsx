import EthAddress from './EthAddress'

import Spacer from '~/utils/Spacer'

export default {
  title: 'Utils/Ethereum',
  component: EthAddress,
}

export const EthAddresses = () => {
  return (
    <div className='flex flex-col justify-between w-screen'>
      <EthAddress
        ethAddress='0xf86B25473cC08F04DA275B2847F2448cf041Fbd5'
        size={4.5}
        length='full'
      />
      <Spacer size={16} axis={'vertical'} />
      <EthAddress
        ethAddress='0xf86B25473cC08F04DA275B2847F2448cf041Fbd5'
        size={4.5}
        length='full'
        walletName='My wallet'
      />
      <Spacer size={16} axis={'vertical'} />

      <EthAddress
        ethAddress='0xf86B25473cC08F04DA275B2847F2448cf041Fbd5'
        size={4.5}
        length='full'
        icons={false}
      />
      <Spacer size={16} axis={'vertical'} />

      <EthAddress
        ethAddress='0xf86B25473cC08F04DA275B2847F2448cf041Fbd5'
        size={4.5}
        length='short'
      />
      <Spacer size={16} axis={'vertical'} />

      <EthAddress
        ethAddress='0xf86B25473cC08F04DA275B2847F2448cf041Fbd5'
        size={4.5}
        length='short'
        walletName='My wallet'
      />
      <Spacer size={16} axis={'vertical'} />

      <EthAddress
        ethAddress='0xf86B25473cC08F04DA275B2847F2448cf041Fbd5'
        size={4.5}
        length='short'
        icons={false}
      />
    </div>
  )
}
