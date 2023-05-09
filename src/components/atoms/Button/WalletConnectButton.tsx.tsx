import { goerli, mainnet, useAccount, useConnect } from 'wagmi'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { Logo } from '../Icon'
import { LogoTypes } from '../Icon/Logo'
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
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect({})
  return (
    <>
      {connectors.map((connector) => (
        <>
          <button
            type='button'
            className='flex flex-row items-center w-48 h-12 px-6 py-2 rounded-xl bg-bgGrayMid hover:bg-dark group'
            onClick={() => connect({ connector })}
          >
            <Logo
              type={supportedSignerWallets.WALLETCONNECT.logoType as LogoTypes}
              size={'xl'}
              interact={true}
            />
            <span className='text-sm text-textBlack group-hover:text-textWhite ml-4'>
              {supportedSignerWallets.WALLETCONNECT.logoName}
            </span>
            {!connector.ready && ' (unsupported)'}
            {isLoading && connector.id === pendingConnector?.id && ' (connecting)'}
          </button>
          {error && <div>{error.message}</div>}
        </>
      ))}
    </>
  )
}

export default WalletConnectButton
