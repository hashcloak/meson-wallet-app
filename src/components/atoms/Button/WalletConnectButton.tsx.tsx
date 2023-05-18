import { useSelector } from 'react-redux'
import { goerli, mainnet, useAccount, useConnect } from 'wagmi'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { Logo } from '../Icon'
import { LogoTypes } from '../Icon/Logo'
import Spinner from '../Spinner'
import { RootState } from '@/features/reducers'
import { SignerState } from '@/features/signerWallet'
import { useConnectWC } from '@/hooks/wagumi/useConnectWC'

type Props = {
  btnType?: 'button' | 'submit'
  logoType?: LogoTypes
  logoName?: string
  interact?: boolean
  handleConnect?: () => void
}

const WalletConnectButton = () => {
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

  const { connectWC, isLoading, errorMessage } = useConnectWC()
  const { isConnected } = useSelector<RootState, SignerState>((state) => state.signerWallet)

  return (
    <>
      <button
        type='button'
        className='flex flex-row items-center w-48 h-12 px-6 py-2 rounded-xl bg-bgGrayMid hover:bg-dark group'
        onClick={connectWC}
      >
        <Logo
          type={supportedSignerWallets.WALLETCONNECT.logoType as LogoTypes}
          size={'xl'}
          interact={true}
        />
        {isLoading ? (
          <div className='w-full text-center'>
            <Spinner size='sm' />
          </div>
        ) : (
          <span className='text-sm text-textBlack group-hover:text-textWhite mx-4'>
            {supportedSignerWallets.WALLETCONNECT.logoName}
          </span>
        )}
      </button>
      {errorMessage && <div>{errorMessage}</div>}
      {isConnected && <div className='text-textAlert'>Connected!</div>}
    </>
  )
}

export default WalletConnectButton
