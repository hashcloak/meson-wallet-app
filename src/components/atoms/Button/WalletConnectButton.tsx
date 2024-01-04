import { FC } from 'react';
import type { WalletConnectModalSignConnectArguments } from '@walletconnect/modal-sign-html';
import {
  WalletConnectModalSign,
  useConnect,
  useDisconnect,
  useSession,
} from '@walletconnect/modal-sign-react';
import { getAddressFromAccount, getSdkError } from '@walletconnect/utils';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Logo } from '../Icon';
import { LogoTypes } from '../Icon/Logo';
import { setError } from '~/features/error';
import { resetLoading, setLoading } from '~/features/loading';
import { RootState } from '~/features/reducers';
import { SignerState, setSignerWallet } from '~/features/signerWallet';
import { setWcWallet, wcWalletState } from '~/features/wcWallet';

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

  const { wallet } = useSelector<RootState, SignerState>(
    (state) => state.signerWallet
  );
  const { session } = useSelector<RootState, wcWalletState>(
    (state) => state.wcWallet
  );

  const params: WalletConnectModalSignConnectArguments = {
    requiredNamespaces: {
      eip155: {
        methods: [
          'eth_sendTransaction',
          'eth_signTransaction',
          'personal_sign',
        ],
        chains: ['eip155:1','eip155:5'],
        events: ['chainChanged', 'accountsChanged'],
      },
    },
  };
  const { connect } = useConnect(params);
  const existingSession = useSession();

  const { disconnect } = useDisconnect({
    topic: existingSession?.topic as string,
    reason: getSdkError('USER_DISCONNECTED'),
  });

  const onConnect = async () => {
    try {
      dispatch(setLoading());
      if (existingSession !== undefined && session === existingSession.topic) {
        await disconnect();
      }
      const newSession = await connect();

      if (newSession !== undefined) {
        const _address: string = getAddressFromAccount(
          newSession?.namespaces.eip155.accounts[0] ?? ''
        );

        dispatch(
          setSignerWallet({
            signerWalletAddress: _address,
            publicKey: newSession.self.publicKey.length
              ? newSession.self.publicKey
              : '',
            serializedPath: '',
            balance: 0,
            isConnected: true,
            wallet: 'WalletConnect',
          })
        );
        dispatch(setWcWallet({
          deposit:undefined,
          session: newSession.topic.length ? newSession.topic : undefined,
        }))
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
        className={`flex flex-row items-center w-[11.5rem] h-12 px-6 py-2 rounded-xl ${
          wallet === 'WalletConnect' ? 'bg-dark' : 'bg-bgGrayMid'
        } hover:bg-dark group`}
        onClick={onConnect}
      >
        <Logo
          type={supportedSignerWallets.WALLETCONNECT.logoType as LogoTypes}
          size={'xl'}
          interact={true}
        />
          <span
            className={`text-xs ${
              wallet === 'WalletConnect' ? 'text-textWhite' : 'text-textBlack'
            } group-hover:text-textWhite mx-4`}
          >
            {supportedSignerWallets.WALLETCONNECT.logoName}
          </span>
      </button>
      <WalletConnectModalSign
        projectId={import.meta.env.VITE_WALLETCONNECT_PROJECT_ID as string}
        metadata={{
          name: 'Meson wallet',
          description: 'Meson wallet',
          url: 'https://meson.com',
          icons: ['/assets/Meson_topbar_logo.png'],
        }}
      />
    </>
  );
};

export default WalletConnectButton;
