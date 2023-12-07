import { FC } from 'react';
import type { WalletConnectModalSignConnectArguments } from '@walletconnect/modal-sign-html';
import {
  WalletConnectModalSign,
  useConnect,
} from '@walletconnect/modal-sign-react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Logo } from '../Icon';
import { LogoTypes } from '../Icon/Logo';
import Spinner from '../Spinner';
import { setError } from '~/features/error';
import { LoadingState, resetLoading, setLoading } from '~/features/loading';
import { RootState } from '~/features/reducers';
import { SignerState, setSignerWallet } from '~/features/signerWallet';

// import { useConnectWC } from '~/hooks/wagumi/useConnectWC';

const WalletConnectButton: FC = () => {
  const supportedSignerWallets = {
    TREZOR: {
      logoType: 'TrezorLogo',
      logoName: 'Trezor',
    },
    LEDGER: {
      logoType: 'LedgerLogo',
      logoName: 'Ledger',
    },
    WALLETCONNECT: {
      logoType: 'WalletConnectLogo',
      logoName: 'WalletConnect',
    },
  };

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isLoading } = useSelector<RootState, LoadingState>(
    (state) => state.loading
  );
  const { wallet } = useSelector<RootState, SignerState>(
    (state) => state.signerWallet
  );

  // const { connectWC, isLoading } = useConnectWC();
  const params: WalletConnectModalSignConnectArguments = {
    requiredNamespaces: {
      eip155: {
        methods: ['eth_sendTransaction',
        'eth_signTransaction',
        'personal_sign',],
        chains: ['eip155:5'],
        events: ['chainChanged', 'accountsChanged'],
      },
    },
  };
  const { connect } = useConnect(params);

  const onConnect = async () => {
    try {
      dispatch(setLoading());

      const _session = await connect();


      if (_session !== undefined) {
        const _address: string =
          _session.namespaces.eip155.accounts[0].split(':')[2];

        dispatch(
          setSignerWallet({
            signerWalletAddress: _address,
            publicKey: _session.self.publicKey.length
              ? _session.self.publicKey
              : '',
            serializedPath: '',
            balance: 0,
            isConnected: true,
            wallet: 'WalletConnect',
            session: _session.topic.length ? _session.topic : undefined,
          })
        );
      }
      dispatch(resetLoading({ message: '' }));
    } catch (error) {
      dispatch(resetLoading({ message: t('walletConnect.error') }));
      if (error instanceof Error) {
        dispatch(setError({ error: error.message }));
      }
    }
  };

  return (
    <>
      <button
        type='button'
        className={`flex flex-row items-center w-[11.5rem] mx-auto h-12 px-6 py-2 rounded-xl ${
          wallet === 'WalletConnect' ? 'bg-dark' : 'bg-bgGrayMid'
        } hover:bg-dark group`}
        // onClick={connectWC}
        onClick={onConnect}
      >
        <Logo
          type={supportedSignerWallets.WALLETCONNECT.logoType as LogoTypes}
          size={'xl'}
          interact={true}
        />
        {isLoading ? (
          <div className='w-full text-center'>
            <Spinner size='sm' />
          </div>
        ) : (
          <span           className={`text-xs ${
            wallet === 'WalletConnect' ? 'text-textWhite' : 'text-textBlack'
          } group-hover:text-textWhite mx-4`}>
            {supportedSignerWallets.WALLETCONNECT.logoName}
          </span>
        )}
      </button>
      <WalletConnectModalSign
        projectId={import.meta.env.VITE_WALLETCONNECT_PROJECT_ID as string}
        metadata={{
          name: 'Meson wallet',
          description: 'Meson wallet',
          url: 'https://my-dapp.com',
          icons: ['https://my-dapp.com/logo.png'],
        }}
      />
    </>
  );
};

export default WalletConnectButton;
