import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useQRCode } from 'next-qrcode';

import { useSelector } from 'react-redux';
import { Button } from '~/components/atoms/Button';
import Switch from '~/components/atoms/Switch';
import EthAddress from '~/utils/Ethereum/EthAddress';
import Spacer from '~/utils/Spacer';
import { MesonWalletState } from '~/features/mesonWallet';
import { RootState } from '~/features/reducers';

const ReceiveTxDetails: React.FC<Props> = ({ onClose }) => {
  const [withPrefix, setWithPrefix] = useState(false);
  const { SVG } = useQRCode();
  const { mesonWallet } = useSelector<RootState, MesonWalletState>(
    (state) => state.mesonWallet
  );
  const selectedNetwork = 'eth';

  return (
    <div className='flex flex-col items-center text-textWhite rounded-2xl'>
      <div>
        {/* <span>
          This is the address of your Meson wallet. Deposit funds by scanning
          the QR code or copying the address below. Only send ETH and assets to
          this address (e.g. ETH, ERC20, ERC721)!
        </span> */}
        <span>
          This is the address of your Meson wallet. Deposit funds by copying the address below. Only send ETH and assets to
          this address (e.g. ETH, ERC20, ERC721)!
        </span>
      </div>
      {/* <Spacer size={16} axis={'vertical'} /> */}
      {/* <div className='flex flex-col justify-center items-center text-textWhite'> */}
        {/* TODO:Check if the destination needs to be wallet url or not */}
        {/* <span>Meson Wallet</span> */}
        {/* <SVG
          text={
            withPrefix
              ? `${selectedNetwork}:${
                  mesonWallet !== undefined
                    ? mesonWallet.mesonWalletAddress
                    : ''
                }`
              : mesonWallet !== undefined
              ? mesonWallet.mesonWalletAddress
              : ''
          }
          options={{
            level: 'M',
            margin: 3,
            scale: 4,
            width: 160,
            color: {
              dark: '#000000',
              light: '#FFFFFF',
            },
          }}
        /> */}
        {/* <Spacer size={8} axis={'vertical'} /> */}
        {/* <Switch
          label={{
            on: `QR code with chain prefix (${selectedNetwork}:)`,
            off: `QR code without chain prefix (${selectedNetwork}:)`,
          }}
          handleClick={() => setWithPrefix(!withPrefix)}
          defaultStatus={false}
        /> */}
      {/* </div> */}
      <Spacer size={32} axis={'vertical'} />
      <EthAddress
        ethAddress={
          mesonWallet !== undefined ? mesonWallet.mesonWalletAddress : ''
        }
        size={4.5}
        length={'full'}
        walletName={'Myy wallet'}
      />
      <Spacer size={32} axis={'vertical'} />
      <Button
        btnVariant={'primary'}
        btnSize={'lg'}
        btnType={'button'}
        handleClick={() => {
          onClose();
        }}
      >
        <span className='text-lg'>Done</span>
      </Button>
    </div>
  );
};

type Props = {
  isOpen: boolean | undefined;
  onClose: () => void;
};

const ReceiveFundsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <>
      {(isOpen ?? false) && (
        <Dialog
          open={isOpen}
          onClose={onClose}
          className='fixed z-10 inset-0 overflow-y-auto'
          static
        >
          <div className='flex items-center justify-center min-h-screen'>
            <Dialog.Overlay
              className='fixed inset-0 bg-neutral-900 opacity-30'
              aria-hidden='true'
            />
            <Dialog.Panel className='relative bg-bgGrayMid dark:bg-bgDarkMid rounded-2xl py-6 px-8 w-[38rem]'>
              <span className='text-textGray dark:text-textWhite text-2xl font-bold'>
                Receive Funds
              </span>

              {/* Description */}
              <ReceiveTxDetails isOpen={isOpen} onClose={onClose} />
              {/* Description */}
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default ReceiveFundsModal;
