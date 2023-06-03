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
      {!isLoading ? (
        <>
          <TrezorButton />
          <LedgerButton />
          <WalletConnectButton />
        </>
      ) : (
        <Spinner />
      )}
      {message != null && (
        <span className='text-textWhite text-sm'>{message}</span>
      )}
    </>
  );
};

export default SignerWallets;
