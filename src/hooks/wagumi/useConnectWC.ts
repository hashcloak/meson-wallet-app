import { useState } from 'react';
import { mainnet, connect } from '@wagmi/core';
import { useSelector, useDispatch } from 'react-redux';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { RootState } from '~/features/reducers';
import { signerWalletSlice } from '~/features/signerWallet';

type ReturnValue = {
  connectWC: () => void;
  isLoading: boolean;
  errorMessage: string;
};

export const useConnectWC = (): ReturnValue => {
  const currentSignerAddress = useSelector<RootState, string>(
    (state) => state.signerWallet.signerWalletAddress
  );
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [signerAddress, setSignerAddress] = useState(
    currentSignerAddress || ''
  );
  const [errorMessage, setErrorMessage] = useState('');
  const { setSignerWallet } = signerWalletSlice.actions;

  const connectWC = async () => {
    if (currentSignerAddress) {
      setIsLoading(false);

      return { signerAddress, isLoading, errorMessage };
    }
    try {
      setIsLoading(true);
      setErrorMessage('');

      const result: any = await connect({
        connector: new WalletConnectConnector({
          chains: [mainnet],
          options: {
            projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID as string,
          },
        }),
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      setSignerAddress(result.account);
      dispatch(
        setSignerWallet({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          signerWalletAddress: result.account,
          isConnected: true,
          wallet: 'WalletConnect',
        })
      );
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`something's wrong: ${err}`);
    } finally {
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  return { connectWC, isLoading, errorMessage };
};
