import { useState } from 'react'
import Blockies from 'react-blockies'
import Button from '../../atoms/Button/Button'
import { Logo, LogoTypes } from '../../atoms/Icon/Logo'
import SwitchSignerModal from '../SwitchSignerModal'
import NoSignerWallet from './NoSignerWallet'
import { useDisconnectWC } from '@/hooks/wagumi/useDisconnectWC'
import CopyToClipboardBtn from '@/utils/CopyToClipboardBtn'
import Spacer from '@/utils/Spacer'
import ViewOn from '@/utils/ViewOn'
import { trimAddress } from '@/utils/trimAddress'

export type ConnectedSignerWalletProps = {
  ethAddress?: string
  isConnected: boolean
  signerWallet?: string
  network?: string
  handleIsOpen?: () => void
}

export const signerWallets: { [k in LogoTypes]?: string }[] = [
  { TrezorLogo: 'Trezor' },
  { WalletConnectLogo: 'WalletConnect' },
  { LedgerLogo: 'Ledger' },
]

// TODO: This needs to be dynamically change based on the props
const ConnectedSignerWallet: React.FC<ConnectedSignerWalletProps> = ({
  ethAddress = '',
  isConnected,
  signerWallet,
  network,
  handleIsOpen,
}) => {
  const selectedSignerWallet = Object.values(signerWallets).filter(
    (wallet) => Object.values(wallet)[0].toString() == signerWallet,
  )[0] as unknown as string

  const { disconnectWC } = useDisconnectWC()

  const handleDisconnect = () => {
    disconnectWC()
  }

  return (
    <>
      {isConnected && ethAddress.length ? (
        <>
          <div className='w-80 rounded-2xl bg-bgDarkMid px-8 py-6'>
            <span className='text-textWhite text-xl font-bold'>Connected signer wallet</span>
            <Spacer size={16} axis={'vertical'} />
            <div className='flex flex-col w-full p-4 box-border rounded-2xl bg-bgDarkLight'>
              <span className='text-textWhite'>Selected wallet</span>

              <Spacer size={16} axis={'vertical'} />

              <div className='flex flex-col items-center w-full'>
                <Blockies seed={ethAddress} scale={6} className='identicon rounded-full' />
                <span className='text-sm'>My wallet</span>
                <div className='flex flex-row items-center'>
                  <span className='text-textWhite text-sm font-bold'>eth:&nbsp;</span>
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
                      <Logo type={Object.keys(selectedSignerWallet)[0] as LogoTypes} size={'md'} />
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
            <div className='flex flex-col justify-center gap-4'>
              {signerWallet == 'Trezor' ? (
                <Button
                  btnVariant={'border'}
                  btnSize={'md'}
                  btnType={'button'}
                  handleClick={handleIsOpen}
                >
                  <span className='text-sm'>Switch signer</span>
                </Button>
              ) : null}
              <Button
                btnVariant={'primary'}
                btnSize={'md'}
                btnType={'button'}
                handleClick={() => console.log('Switch wallet')}
              >
                <span className='text-sm'>Switch wallet</span>
              </Button>
              <Button
                btnVariant={'alert'}
                btnSize={'md'}
                btnType={'button'}
                handleClick={handleDisconnect}
              >
                <span className='text-sm'>Disconnect</span>
              </Button>
            </div>
          </div>
        </>
      ) : (
        <NoSignerWallet />
      )}
    </>
  )
}

export default ConnectedSignerWallet
