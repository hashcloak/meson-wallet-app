/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import LedgerButton from '~/components/atoms/Button/LedgerButton';
import TrezorButton from '~/components/atoms/Button/TrezorButton';
import WalletConnectButton from '~/components/atoms/Button/WalletConnectButton';
import Spinner from '~/components/atoms/Spinner';
import { LoadingState } from '~/features/loading';
import { RootState } from '~/features/reducers';

const SignerWallets: React.FC = () => {
  const { isLoading, message } = useSelector<RootState, LoadingState>(
    (state) => state.loading
  );

  return (
    <>
      <>
        <TrezorButton />
        <LedgerButton />
        <WalletConnectButton />
      </>
      {/* {isLoading && (
        <div className='fixed top-0 left-0 w-full h-full bg-bgDarkMid opacity-90 z-[999]'>
          <div className='absolute h-16 w-16 top-2/4 left-2/4 z-[999] flex justify-center items-center'>
            <Spinner />
          </div>
        </div>
      )} */}
      {message != null && (
        <span className='text-textWhite text-sm'>{message}</span>
      )}
    </>
  );
};

export default SignerWallets;
