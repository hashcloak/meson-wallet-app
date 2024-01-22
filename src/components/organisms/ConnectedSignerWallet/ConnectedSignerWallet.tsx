import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import Blockies from 'react-blockies';
import { useDispatch } from 'react-redux';
import SignerWallets from '~/components/molecules/SignerWallets';
import CopyToClipboardBtn from '~/utils/CopyToClipboardBtn';
import Spacer from '~/utils/Spacer';
import ViewOn from '~/utils/ViewOn';
import Button from '../../atoms/Button/Button';
import { Logo, LogoTypes } from '../../atoms/Icon/Logo';
import NoSignerWallet from './NoSignerWallet';
import { resetSignerWallet } from '~/features/signerWallet';
import { trimAddress } from '~/utils/trimAddress';

export type ConnectedSignerWalletProps = {
  ethAddress?: string;
  isConnected: boolean;
  signerWallet?: string;
  network?: string;
  handleIsOpen?: () => void;
};

export const signerWallets: Array<{ [k in LogoTypes]?: string }> = [
  { TrezorLogo: 'Trezor' },
  { WalletConnectLogo: 'WalletConnect' },
  { LedgerLogo: 'Ledger' },
  { HardhatLogo: 'Hardhat' },
];

// TODO: This needs to be dynamically change based on the props
const ConnectedSignerWallet: React.FC<ConnectedSignerWalletProps> = ({
  ethAddress = '',
  isConnected,
  signerWallet,
  network,
  handleIsOpen,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedSignerWallet = Object.values(signerWallets).filter(
    (wallet) => Object.values(wallet)[0].toString() === signerWallet
  )[0] as unknown as string;

  const dispatch = useDispatch();

  return (
    <>
      {isConnected && ethAddress.length ? (
        <>
          <div className='w-80 rounded-2xl bg-bgGrayMid dark:bg-bgDarkMid px-8 py-6'>
            <span className='text-textGray dark:text-textWhite text-xl font-bold'>
              Connected signer wallet
            </span>
            <Spacer size={16} axis={'vertical'} />
            <div className='flex flex-col w-full p-4 box-border rounded-2xl bg-bgGrayLight  dark:bg-bgDarkLight'>
              <span className='text-textGray dark:text-textWhite'>
                Selected wallet
              </span>

              <Spacer size={16} axis={'vertical'} />

              <div className='flex flex-col items-center w-full'>
                <Blockies
                  seed={ethAddress}
                  scale={6}
                  className='identicon rounded-full'
                />
                <span className='text-sm'>My wallet</span>
                <div className='flex flex-row items-center'>
                  <span className='text-textGray dark:text-textWhite text-sm font-bold'>
                    eth:&nbsp;
                  </span>
                  <span className='text-textGray dark:text-textWhite text-base font-normal'>
                    {trimAddress(ethAddress)}
                  </span>
                </div>
                <div className='flex flex-row items-center'>
                  <CopyToClipboardBtn textToCopy={ethAddress} />
                  <Spacer size={8} axis={'horizontal'} />
                  <ViewOn address={ethAddress} />
                </div>
                <Spacer size={8} axis={'vertical'} />
                <div className='w-full box-border'>
                  <div className='flex flex-row justify-between items-center w-full'>
                    <span className='text-textGray dark:text-textWhite text-base'>
                      Wallet
                    </span>
                    <div className='flex flex-row justify-center'>
                      <Logo
                        type={Object.keys(selectedSignerWallet)[0] as LogoTypes}
                        size={'md'}
                      />
                      <Spacer size={8} axis={'horizontal'} />
                      <span className='text-sm text-textWhite'>
                        {Object.values(selectedSignerWallet)[0]}
                      </span>
                    </div>
                  </div>
                  <div className='flex flex-row justify-between items-center w-full'>
                    <span className='text-textGray dark:text-textWhite text-base'>
                      Network
                    </span>
                    <span className='text-textGray dark:text-textWhite text-base'>
                      {network}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <Spacer size={24} axis={'vertical'} />
            <div className='flex flex-col justify-center gap-4'>
              {signerWallet === 'Trezor' ? (
                <Button
                  btnVariant={'border'}
                  btnSize={'md'}
                  btnType={'button'}
                  handleClick={handleIsOpen}
                >
                  <span className='text-sm'>Switch signer</span>
                </Button>
              ) : null}
              <Button
                btnVariant={'primary'}
                btnSize={'md'}
                btnType={'button'}
                handleClick={() => setIsOpen(true)}
              >
                <span className='text-sm'>Switch wallet</span>
              </Button>
              <Button
                btnVariant={'alert'}
                btnSize={'md'}
                btnType={'button'}
                handleClick={() => dispatch(resetSignerWallet())}
              >
                <span className='text-sm'>Disconnect</span>
              </Button>
            </div>
          </div>

          {isOpen && (
            <Dialog
              open={isOpen}
              onClose={() => setIsOpen(false)}
              className='fixed z-[99] inset-0 overflow-y-auto'
              // static
            >
              <div className='flex items-center justify-center min-h-screen'>
                <Dialog.Overlay
                  className='fixed inset-0 bg-neutral-900 opacity-30'
                  aria-hidden='true'
                />
                <div className='py-6 relative bg-bgGrayMid dark:bg-bgDarkMid rounded-2xl px-8 w-[48rem]'>
                  {/* Description */}
                  <span className='text-textGray dark:text-textWhite text-xl font-bold'>
                    Connect a signer wallet
                  </span>

                  <Spacer size={16} axis={'vertical'} />

                  <div className='flex flex-col w-full p-4 box-border rounded-2xl bg-bgGrayLight  dark:bg-bgDarkLight'>
                    <div className='flex flex-col items-center w-full'>
                      <div className='w-full'>
                        <span className='text-textGray dark:text-textWhite text-base font-bold'>
                          Available Wallets
                        </span>
                        <Spacer size={8} axis={'vertical'} />
                        <div className='grid grid-cols-1 gap-2 mx-8'>
                          <SignerWallets />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Description */}
                </div>
              </div>
            </Dialog>
          )}
        </>
      ) : (
        <NoSignerWallet />
      )}
    </>
  );
};

export default ConnectedSignerWallet;
