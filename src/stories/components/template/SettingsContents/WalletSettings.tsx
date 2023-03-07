import { SidebarIcon } from '../../atoms/Icon/SidebarIcon'
import { OwnerType } from '../../organisms/EditOwners/EditOwners'

import EthAddress from '~/stories/utils/Ethereum/EthAddress'
import Spacer from '~/utils/Spacer'

export const mockOwners: OwnerType[] = [
  { address: '0xfF501B324DC6d78dC9F983f140B9211c3EdB4dc7', name: 'Owner1' },
  { address: '0xf86B25473cC08F04DA275B2847F2448cf041Fbd5', name: '' },
]

const WalletSettings = () => {
  return (
    <div className='flex flex-col w-full rounded-2xl bg-bgDarkLight text-textWhite text-lg px-8 py-4 h-full'>
      <span className='text-3xl font-bold'>Wallet settings</span>
      <Spacer size={24} axis={'vertical'} />
      <div className='flex flex-col'>
        <div className='flex flex-row justify-between items-center px-4 hover:bg-dark rounded-2xl'>
          <div className='flex flex-row'>
            <span className='mr-2'>Wallet name: </span>
            <span>My wallet </span>
          </div>
          <button type='button'>
            <SidebarIcon type={'Settings'} size={'md'} color={'main'} />
          </button>
        </div>
        <Spacer size={8} axis={'vertical'} />

        <div className='flex flex-row px-4'>
          <span className='mr-2'>Network: </span>
          <span>Ethereum </span>
        </div>
        <Spacer size={8} axis={'vertical'} />

        <div className='flex flex-col'>
          <div className='flex flex-row justify-between items-center px-4 hover:bg-dark rounded-2xl'>
            <div className='flex flex-row'>
              <span className='mr-2'>Owners: </span>
            </div>
            <button type='button'>
              <SidebarIcon type={'Settings'} size={'md'} color={'main'} />
            </button>
          </div>
          <div className='pl-6'>
            {mockOwners.map((owner) => (
              <>
                <EthAddress
                  ethAddress={owner.address}
                  size={4.5}
                  length={'full'}
                  walletName={owner.name}
                  key={owner.address}
                />
                <Spacer size={8} axis={'vertical'} />
              </>
            ))}
          </div>
        </div>
        <Spacer size={8} axis={'vertical'} />

        <div className='flex flex-row px-4'>
          <span className='mr-2'>Required confirmations: </span>
          <span>1 out of 2 owners </span>
        </div>
      </div>
    </div>
  )
}

export default WalletSettings
