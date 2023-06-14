/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import LedgerButton from '~/components/atoms/Button/LedgerButton';
import TrezorButton from '~/components/atoms/Button/TrezorButton';
// import WalletConnectButton from '~/components/atoms/Button/WalletConnectButton';
import { LoadingState } from '~/features/loading';
import { RootState } from '~/features/reducers';
import { SignerState } from '~/features/signerWallet';

const SignerWallets: React.FC = () => {
  const { message } = useSelector<RootState, LoadingState>(
    (state) => state.loading
  );
  const { signerWalletAddress } = useSelector<RootState, SignerState>(
    (state) => state.signerWallet
  );

  return (
    <div>
      <div className='flex flex-row gap-4'>
        <TrezorButton />
        <LedgerButton />
        {/* <WalletConnectButton /> */}
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
    </div>
  );
};

export default SignerWallets;
