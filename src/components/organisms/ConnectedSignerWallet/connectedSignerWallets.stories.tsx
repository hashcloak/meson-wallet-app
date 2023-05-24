import Dialog from '~/components/atoms/Dialog';
import ConnectedSignerWallet from './ConnectedSignerWallet';
import ConnectedSignerWalletBtn from './ConnectedSignerWalletBtn';

export default {
  title: 'Components/Organisms/ConnectedSignerWallet',
  component: ConnectedSignerWallet,
};

export const ConnectedSignerWallets = (): React.ReactElement => {
  const network = 'Ethereum';
  const signerAddress = '0xfF501B324DC6d78dC9F983f140B9211c3EdB4dc7';
  const selectedSignerWallet = 'Trezor';

  return (
    <div className='flex flex-row w-screen flex-wrap'>
      <div className='flex flex-row flex-wrap w-full mt-8'>
        <Dialog
          popupBtn={
            <ConnectedSignerWalletBtn isConnected={false} network={network} />
          }
          popupContent={
            <ConnectedSignerWallet isConnected={false} network={network} />
          }
        />
      </div>
      <div className='flex flex-row flex-wrap w-full mt-8'>
        <Dialog
          popupBtn={
            <ConnectedSignerWalletBtn
              isConnected={true}
              ethAddress={signerAddress}
              signerWallet={selectedSignerWallet}
              network={network}
            />
          }
          popupContent={
            <ConnectedSignerWallet
              isConnected={true}
              ethAddress={signerAddress}
              signerWallet={selectedSignerWallet}
              network={network}
            />
          }
        />
      </div>
    </div>
  );
};

export const VariationSignerWallets = (): React.ReactElement => {
  const network = 'Ethereum';
  const signerAddress = '0xfF501B324DC6d78dC9F983f140B9211c3EdB4dc7';
  const signerWallets = ['Metamask', 'Trezor', 'WalletConnect', 'Ledger'];

  return (
    <div className='flex flex-row w-screen flex-wrap'>
      {signerWallets.map((signerWallet) => (
        <div className='flex flex-row flex-wrap w-full mt-8' key={signerWallet}>
          <Dialog
            popupBtn={
              <ConnectedSignerWalletBtn
                isConnected={true}
                ethAddress={signerAddress}
                signerWallet={signerWallet}
                network={network}
              />
            }
            popupContent={
              <ConnectedSignerWallet
                isConnected={true}
                ethAddress={signerAddress}
                signerWallet={signerWallet}
                network={network}
              />
            }
          />
        </div>
      ))}
    </div>
  );
};
