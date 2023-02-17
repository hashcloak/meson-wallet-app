import Blockies from 'react-blockies'

import EthAddress from '../../../utils/Ethereum/EthAddress'
import Button from '../../atoms/Button/Button'
import SignerWalletButton from '../../atoms/Button/SignerWalletButton'
import { Icon } from '../../atoms/Icon/Icon'
import { Logo, LogoTypes } from '../../atoms/Icon/Logo'
import CustomLink from '../../atoms/Link/CustomLink'
import SignerWallets from '../../molecules/SignerWallets/SignerWallets'

import CopyToClipboardBtn from '~/stories/utils/CopyToClipboardBtn/CopyToClipboardBtn'
import ViewOn from '~/stories/utils/ViewOn/ViewOn'
import { trimAddress } from '~/stories/utils/trimAddress'
import Spacer from '~/utils/Spacer'

type Props = {
  ethAddress?: string
  isConnected: boolean
  signerWallet?: string
  network?: string
}

const signerWallets: { [k in LogoTypes]?: string }[] = [
  { TrezorLogo: 'Trezor' },
  { WalletConnectLogo: 'WalletConnect' },
  { LedgerLogo: 'Ledger' },
  { MetamaskLogo: 'Metamask' },
]

const NoSignerWalletBtn = () => {
  return (
    <div className='flex flex-row items-center justify-center min-w-[14rem]'>
      <Icon type={'AccountCircle'} size={'xxl'} color={'white'} />
      <Spacer size={8} axis={'horizontal'} />
      <div className='flex flex-col items-start'>
        <span className='text-textWhite text-base font-bold'>
          Not Connected
        </span>
        <span className='text-alert text-xs font-normal'>
          Connect a signer wallet
        </span>
      </div>
    </div>
  )
}

const NoSignerWallet = () => {
  return (
    <div className='w-[31rem] rounded-2xl bg-bgDarkMid px-8 py-6'>
      <span className='text-textWhite text-xl font-bold'>
        Connect a signer wallet
      </span>

      <Spacer size={16} axis={'vertical'} />

      <div className='flex flex-col w-full p-4 box-border rounded-2xl bg-bgDarkLight'>
        <div className='flex flex-col items-center w-full'>
          <Icon type={'AccountCircle'} size={'xxl'} color={'white'} />

          <Spacer size={8} axis={'vertical'} />

          <div>
            <span className='text-base text-textWhite'>
              In order to select the network to create your Meson Wallet, your
              wallet needs to be connected.
            </span>
            <br />
            <CustomLink url={''} size={'base'}>
              Why do you need to connect a signer wallet?
            </CustomLink>
          </div>

          <Spacer size={16} axis={'vertical'} />

          <div className='w-full'>
            <span className='text-textWhite text-base font-bold'>
              Available Wallets
            </span>
            <Spacer size={8} axis={'vertical'} />
            <div className='grid grid-cols-2 gap-2'>
              <SignerWallets />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// TODO: This needs to be dynamically change based on the props
const ConnectedSignerWalletBtn: React.FC<Props> = ({
  ethAddress = '',
  isConnected,
  signerWallet,
  network,
}) => {
  const selectedSignerWallet = Object.values(signerWallets).filter(
    (wallet) => Object.values(wallet)[0].toString() == signerWallet
  ) as unknown as string

  return (
    <>
      {isConnected && ethAddress.length ? (
        <div className='flex flex-row items-center min-w-[14rem]'>
          <Logo
            type={Object.keys(selectedSignerWallet[0])[0] as LogoTypes}
            size={'xl'}
          />
          <Spacer size={8} axis={'horizontal'} />
          <div className='flex flex-col items-start'>
            <span className='text-textWhite text-sm font-bold'>
              {Object.values(selectedSignerWallet[0])} @ {network}
            </span>
            <div className='flex flex-row items-center'>
              <EthAddress
                ethAddress={ethAddress}
                size={2}
                length={'short'}
                icons={false}
              />
            </div>
          </div>
        </div>
      ) : (
        <NoSignerWalletBtn />
      )}
    </>
  )
}

// TODO: This needs to be dynamically change based on the props
const ConnectedSignerWallet: React.FC<Props> = ({
  ethAddress = '',
  isConnected,
  signerWallet,
  network,
}) => {
  const selectedSignerWallet = Object.values(signerWallets).filter(
    (wallet) => Object.values(wallet)[0].toString() == signerWallet
  )[0] as unknown as string

  return (
    <>
      {isConnected && ethAddress.length ? (
        <div className='w-80 rounded-2xl bg-bgDarkMid px-8 py-6'>
          <span className='text-textWhite text-xl font-bold'>
            Connected signer wallet
          </span>
          <Spacer size={16} axis={'vertical'} />
          <div className='flex flex-col w-full p-4 box-border rounded-2xl bg-bgDarkLight'>
            <span className='text-textWhite'>Selected wallet</span>

            <Spacer size={16} axis={'vertical'} />

            <div className='flex flex-col items-center w-full'>
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
              <div className='w-full box-border'>
                <div className='flex flex-row justify-between items-center w-full'>
                  <span className='text-textWhite text-base'>Wallet</span>
                  <div className='flex flex-row justify-center'>
                    <Logo
                      type={Object.keys(selectedSignerWallet)[0] as LogoTypes}
                      size={'md'}
                    />
                    <Spacer size={8} axis={'horizontal'} />
                    <span className='text-sm text-textWhite'>
                      {Object.values(selectedSignerWallet)[0]}
                    </span>
                  </div>
                </div>
                <div className='flex flex-row justify-between items-center w-full'>
                  <span className='text-textWhite text-base'>Network</span>
                  <span className='text-textWhite text-base'>{network}</span>
                </div>
              </div>
            </div>
          </div>
          <Spacer size={24} axis={'vertical'} />
          <div className='flex flex-row justify-center'>
            <Button
              btnVariant={'alert'}
              btnSize={'md'}
              btnType={'button'}
              handleClick={() => console.log('Disconnect')}
            >
              <span className='text-sm'>Disconnect</span>
            </Button>
          </div>
        </div>
      ) : (
        <NoSignerWallet />
      )}
    </>
  )
}

export { ConnectedSignerWalletBtn, ConnectedSignerWallet }
