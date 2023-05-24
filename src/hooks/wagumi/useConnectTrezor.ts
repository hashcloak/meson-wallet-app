import { useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { EthereumAddress } from 'trezor-connect'
import { RootState } from '@/features/reducers'
import { signerWalletSlice } from '@/features/signerWallet'
import { ITrezorState, trezorActions } from '@/features/tezorWallet'
import { getAccounts } from '@/service'

type ReturnValue = {
  getFullAccounts: () => void
  trezorAccounts: EthereumAddress[]
  isLoading: boolean
}

export const useConnectTrezor = (): ReturnValue => {
  // const currentSignerAddress = useSelector<RootState, string>(
  //   (state) => state.signerWallet.signerWalletAddress
  // );
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // const [signerAddress, setSignerAddress] = useState(
  //   currentSignerAddress || ''
  // );
  // const [errorMessage, setErrorMessage] = useState('');
  const { setSignerWallet } = signerWalletSlice.actions

  const trezorAccounts = useSelector<RootState, ITrezorState>(
    (state) => state.trezorWallet,
  ) as unknown as EthereumAddress[]

  const getFullAccounts = useCallback(async () => {
    setIsLoading(true)
    if (trezorAccounts.length) {
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
    setIsLoading(false)

    return trezorGetAccountResponse
  }, [dispatch, trezorAccounts])

  // const connectTrezor = async () => {
  //   if (currentSignerAddress) {
  //     setIsLoading(false);

  //     return { signerAddress, isLoading, errorMessage };
  //   }
  //   try {
  //     setIsLoading(true);
  //     setErrorMessage('');

  //     const result: any = await connect({
  //       connector: new WalletConnectConnector({
  //         chains: [mainnet],
  //         options: {
  //           projectId: import.meta.env.VITE_PUBLIC_WALLETCONNECT_PROJECT_ID as string ,
  //         },
  //       }),
  //     });
  //     setSignerAddress(result.account);
  //     dispatch(
  //       setSignerWallet({
  //         signerWalletAddress: result.account,
  //         isConnected: true,
  //         wallet: 'WalletConnect',
  //       })
  //     );
  //   } catch (err) {
  //     throw new Error(`something's wrong: ${err}`);
  //   } finally {
  //     setIsLoading(false);
  //   }

  //   setIsLoading(false);
  // };

  return {
    getFullAccounts,
    trezorAccounts,
    isLoading,
    // errorMessage,
  }
}
