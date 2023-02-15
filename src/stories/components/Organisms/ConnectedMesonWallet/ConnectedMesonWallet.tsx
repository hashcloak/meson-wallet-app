import Blockies from 'react-blockies'

import EthAddress from '../../Ethereum/EthAddress'
import Button from '../../atoms/Button/Button'
import { Icon } from '../../atoms/Icon/Icon'
import Option from '../../atoms/Option/Option'
import { mock } from '../../atoms/Option/options.stories'

import CopyToClipboardBtn from '~/stories/utils/CopyToClipboardBtn/CopyToClipboardBtn'
import ViewOn from '~/stories/utils/ViewOn/ViewOn'
import { trimAddress } from '~/stories/utils/trimAddress'
import Spacer from '~/utils/Spacer'

type Props = {
  ethAddress?: string
  isConnected: boolean
}

// TODO: This needs to be dynamically change based on the props
const ConnectedMesonWalletBtn: React.FC<Props> = ({
  ethAddress = '',
  isConnected,
}) => {
  return (
    <>
      {isConnected && ethAddress.length ? (
        <div className='flex flex-row items-center'>
          <Blockies
            seed={ethAddress}
            scale={4}
            className='identicon rounded-full'
          />
          <Spacer size={8} axis={'horizontal'} />
          <div className='flex flex-col items-start'>
            <span className='text-sm'>My wallet</span>
            <div className='flex flex-row items-center'>
              <span className='text-textWhite text-sm font-bold'>
                eth:&nbsp;
              </span>
              <span className='text-textWhite text-base font-normal'>
                {trimAddress(ethAddress)}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex justify-center min-w-[11rem]'>
          <Icon type={'MesonCircle'} size={'xl'} color={'none'} />
        </div>
      )}
    </>
  )
}

const ConnectedMesonWallet: React.FC<Props> = ({
  ethAddress = '',
  isConnected,
}) => {
  return (
    <>
      {isConnected && ethAddress.length ? (
        <div className='w-[22rem] rounded-2xl bg-bgDarkMid px-8 py-6'>
          <span className='text-textWhite text-xl font-bold'>
            Your Meson Wallet
          </span>
          <Spacer size={16} axis={'vertical'} />
          <div className='flex flex-col w-full p-4 box-border rounded-2xl bg-bgDarkLight'>
            <span className='text-textWhite'>Selected wallet</span>

            <Spacer size={16} axis={'vertical'} />

            <div className='flex flex-col items-center'>
              <Blockies
                seed={ethAddress}
                scale={6}
                className='identicon rounded-full'
              />
              <span className='text-sm'>My wallet</span>
              <div className='flex flex-row items-center'>
                <span className='text-textWhite text-sm font-bold'>
                  eth:&nbsp;
                </span>
                <span className='text-textWhite text-base font-normal'>
                  {trimAddress(ethAddress)}
                </span>
              </div>
              <div className='flex flex-row items-center'>
                <CopyToClipboardBtn textToCopy={ethAddress} />
                <Spacer size={8} axis={'horizontal'} />
                <ViewOn address={ethAddress} />
              </div>
              <Spacer size={8} axis={'vertical'} />
              <Option options={mock} />
            </div>
          </div>
          <Spacer size={24} axis={'vertical'} />
          <div className='flex flex-row justify-between'>
            <Button
              btnVariant={'border'}
              btnSize={'md'}
              btnType={'button'}
              handleClick={() => {
                console.log('Switch wallet')
              }}
            >
              <span className='text-sm'>Switch wallet</span>
            </Button>
            <Button
              btnVariant={'alert'}
              btnSize={'md'}
              btnType={'button'}
              handleClick={() => {
                console.log('Disconnect wallet')
              }}
            >
              <span className='text-sm'>Disconnect</span>
            </Button>
          </div>
        </div>
      ) : null}
    </>
  )
}

export { ConnectedMesonWalletBtn, ConnectedMesonWallet }
