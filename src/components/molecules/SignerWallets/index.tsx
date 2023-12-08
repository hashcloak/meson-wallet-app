/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  HardhatButton,
  LedgerButton,
  TrezorButton,
  WalletConnectButton,
} from '~/components/atoms/Button';
import { LoadingState } from '~/features/loading';
import { NetworkState } from '~/features/network';
import { RootState } from '~/features/reducers';
import { SignerState } from '~/features/signerWallet';
import { useDisconnectWC } from '~/hooks/wagumi/useDisconnectWC';

const SignerWallets: React.FC = () => {
  const { message } = useSelector<RootState, LoadingState>(
    (state) => state.loading
  );
  const { signerWalletAddress } = useSelector<RootState, SignerState>(
    (state) => state.signerWallet
  );
  const { network } = useSelector<RootState, NetworkState>(
    (state) => state.network
  );

  const { disconnectWC } = useDisconnectWC();

  useEffect(() => {
    void disconnectWC();
  }, [network]);

  return (
    <>
      <div className='flex flex-wrap gap-4 justify-start'>
        <TrezorButton />
        <LedgerButton />
        <HardhatButton />
        <WalletConnectButton />
      </div>

      {message != null && (
        <span
          className={`text-textBlack text-sm rounded-md bg-light ${
            message && 'px-2'
          }`}
        >
          {message}
        </span>
      )}
      {signerWalletAddress && (
        <span className={`text-textBlack text-sm rounded-md bg-light px-2`}>
          Connected!
        </span>
      )}
    </>
  );
};

export default SignerWallets;
