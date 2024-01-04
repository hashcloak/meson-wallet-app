/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import {
  HardhatButton,
  LedgerButton,
  TrezorButton,
  WalletConnectButton,
} from '~/components/atoms/Button';
import { LoadingState } from '~/features/loading';
import { RootState } from '~/features/reducers';

const SignerWallets: React.FC = () => {
  const { message } = useSelector<RootState, LoadingState>(
    (state) => state.loading
  );

  return (
    <>
      <div className='flex flex-wrap gap-4'>
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
    </>
  );
};

export default SignerWallets;
