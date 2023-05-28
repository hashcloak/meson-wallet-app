import { disconnect } from '@wagmi/core';
import { useDispatch } from 'react-redux';
import { signerWalletSlice } from '~/features/signerWallet';

type ReturnedType = {
  disconnectWC: () => Promise<void>;
};

export const useDisconnectWC = (): ReturnedType => {
  const dispatch = useDispatch();
  const { setSignerWallet } = signerWalletSlice.actions;

  const disconnectWC = async () => {
    await disconnect();
    dispatch(
      setSignerWallet({
        signerWalletAddress: '',
        isConnected: false,
        wallet: null,
        publicKey: '',
      })
    );
  };

  return { disconnectWC };
};
