import { mainnet, goerli } from '@wagmi/core'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

export const useConnectWC = () => {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const walletConnectConnector = () => {
    connect(connectors[0] as Partial<any>)
  }

  return { walletConnectConnector, address, isConnected }
}
