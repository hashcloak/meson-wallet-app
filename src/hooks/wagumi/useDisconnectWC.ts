import { disconnect } from '@wagmi/core'
import { useDispatch } from 'react-redux'
import { signerWalletSlice } from '@/features/signerWallet'

export const useDisconnectWC = () => {
  const dispatch = useDispatch()
  const { setSignerWallet } = signerWalletSlice.actions

  const disconnectWC = async () => {
    await disconnect()
    dispatch(
      setSignerWallet({
        signerWalletAddress: '',
        isConnected: false,
        wallet: null,
      }),
    )
  }

  return { disconnectWC }
}
