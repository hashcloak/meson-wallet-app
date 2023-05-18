import { mainnet, goerli, connect } from '@wagmi/core'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { RootState } from '@/features/reducers'
import { signerWalletSlice } from '@/features/signerWallet'

export const useConnectWC = () => {
  const currentSignerAddress = useSelector<RootState, string>(
    (state) => state.signerWallet.signerWalletAddress,
  )
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [signerAddress, setSignerAddress] = useState(currentSignerAddress || '')
  const [errorMessage, setErrorMessage] = useState('')
  const { setSignerWallet } = signerWalletSlice.actions

  const connectWC = async () => {
    if (currentSignerAddress) {
      setIsLoading(false)
      return { signerAddress, isLoading, errorMessage }
    }
    try {
      setIsLoading(true)
      setErrorMessage('')

      const result: any = await connect({
        connector: new WalletConnectConnector({
          chains: [mainnet],
          options: {
            projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
          },
        }),
      })
      setSignerAddress(result.account)
      dispatch(
        setSignerWallet({
          signerWalletAddress: result.account,
          isConnected: true,
          wallet: 'WalletConnect',
        }),
      )
    } catch (err) {
      throw new Error(`something's wrong: ${err}`)
    } finally {
      setIsLoading(false)
    }

    setIsLoading(false)
  }
  return { connectWC, isLoading, errorMessage }
}
