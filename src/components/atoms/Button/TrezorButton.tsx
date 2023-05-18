import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNetwork, useSwitchNetwork } from 'wagmi'
import { Logo } from '../Icon'
import { LogoTypes } from '../Icon/Logo'
import Spinner from '../Spinner'
import { RootState } from '@/features/reducers'
import { SignerState } from '@/features/signerWallet'
import { useConnectTrezor } from '@/hooks/wagumi/useConnectTrezor'
import { useConnectWC } from '@/hooks/wagumi/useConnectWC'
import { useTrezor } from '@/utils/Trezor'

type Props = {
  btnType?: 'button' | 'submit'
  logoType?: LogoTypes
  logoName?: string
  interact?: boolean
  handleConnect?: () => void
}

const TrezorButton = () => {
  const supportedSignerWallets = {
    TREZOR: {
      logoType: 'TrezorLogo',
      logoName: 'Trezor',
    },
    LEDGER: {
      logoType: 'LedgerLogo',
      logoName: 'Ledger',
    },
    WALLETCONNECT: {
      logoType: 'WalletConnectLogo',
      logoName: 'WalletConnect',
    },
  }

  const { connectTrezor, isLoading, errorMessage, getFullAccounts } = useConnectTrezor()
  const { isConnected } = useSelector<RootState, SignerState>((state) => state.signerWallet)

  const { signWallet } = useTrezor()

  const onClick = async (address: string, serializedPath: string) => {
    // signWallet(address, serializedPath);
    // setAccount(address);
    console.log(trezorAccounts)
  }
  const trezorAccounts = useSelector((state: any) => state.trezor)

  return (
    <>
      <button
        type='button'
        className='flex flex-row items-center w-48 h-12 px-6 py-2 rounded-xl bg-bgGrayMid hover:bg-dark group'
        onClick={getFullAccounts}
      >
        <Logo
          type={supportedSignerWallets.TREZOR.logoType as LogoTypes}
          size={'xl'}
          interact={true}
        />
        {isLoading ? (
          <div className='w-full text-center'>
            <Spinner size='sm' />
          </div>
        ) : (
          <span className='text-sm text-textBlack group-hover:text-textWhite mx-4'>
            {supportedSignerWallets.TREZOR.logoName}
          </span>
        )}
      </button>
      {errorMessage && <div>{errorMessage}</div>}
    </>
  )
}

export default TrezorButton
