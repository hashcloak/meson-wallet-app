import EthAddress from './EthAddress'

import { DisplayBox } from '~/utils/DisplayBox'

export default {
  title: 'Components/Ethereum',
  component: EthAddress,
}

export const EthAddresses = () => {
  return (
    <div className='flex flex-col justify-between w-screen flex-wrap'>
      <EthAddress
        ethAddress='0xf86B25473cC08F04DA275B2847F2448cf041Fbd5'
        size={4.5}
        length='short'
      />
      <EthAddress
        ethAddress='0xf86B25473cC08F04DA275B2847F2448cf041Fbd5'
        size={4.5}
        length='short'
        icons={false}
      />
    </div>
  )
}
