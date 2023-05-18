import { mainnet, goerli, connect } from '@wagmi/core'
import { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { RootState } from '@/features/reducers'
import { signerWalletSlice } from '@/features/signerWallet'
import { trezorActions } from '@/features/tezorWallet'
import { get50Accounts, getAccounts } from '@/service'

export const useConnectTrezor = () => {
  const currentSignerAddress = useSelector<RootState, string>(
    (state) => state.signerWallet.signerWalletAddress,
  )
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [signerAddress, setSignerAddress] = useState(currentSignerAddress || '')
  const [errorMessage, setErrorMessage] = useState('')
  const { setSignerWallet } = signerWalletSlice.actions

  const trezorAccounts = useSelector((state: any) => state.trezor)

  const getFullAccounts = useCallback(async () => {
    if (trezorAccounts) {
      return trezorAccounts
    }

    const trezorGetAccountResponse = await getAccounts()

    dispatch(trezorActions.setTrezorAccounts(trezorGetAccountResponse))
    dispatch(
      setSignerWallet({
        signerWalletAddress: trezorGetAccountResponse[0].address,
        isConnected: true,
        wallet: 'Trezor',
        serializedPath: trezorGetAccountResponse[0].serializedPath,
      }),
    )

    return trezorGetAccountResponse
  }, [dispatch, trezorAccounts])

  const connectTrezor = async () => {
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

  return {
    getFullAccounts,
    trezorAccounts,
    connectTrezor,
    isLoading,
    errorMessage,
  }
}
