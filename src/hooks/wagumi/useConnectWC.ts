import { mainnet, goerli, connect } from '@wagmi/core'
import { useEffect, useState } from 'react'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

export const useConnectWC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [signerAddress, setSignerAddress] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const connectWC = async () => {
    try {
      setIsLoading(true)
      setErrorMessage('')

      const result: any = await connect({
        connector: new WalletConnectConnector({
          chains: [goerli],
          options: {
            projectId: process.env.WALLETCONNECT_PROJECT_ID!,
          },
        }),
      })

      setSignerAddress(result.account)
    } catch (err) {
      setErrorMessage(`something's wrong`)
      throw new Error(`something's wrong`)
    } finally {
      setIsLoading(false)
    }

    setIsLoading(false)
  }
  console.log(signerAddress)

  return { connectWC, signerAddress, isLoading, errorMessage }
}
