import Blockies from 'react-blockies';
import { Button } from '~/components/atoms/Button';
import { Option } from '~/components/atoms/Option';
import CopyToClipboardBtn from '~/utils/CopyToClipboardBtn';
import { mockNetworks } from '~/utils/Mock';
import Spacer from '~/utils/Spacer';
import ViewOn from '~/utils/ViewOn';
import { trimAddress } from '~/utils/trimAddress';

export type ConnectedMesonWalletProps = {
  ethAddress?: string;
  isConnected: boolean;
};

const ConnectedMesonWallet: React.FC<ConnectedMesonWalletProps> = ({
  ethAddress = '',
  isConnected,
}) => {
  return (
    <>
      {isConnected && ethAddress.length ? (
        <div className='w-[22rem] rounded-2xl bg-bgDarkMid px-8 py-6'>
          <span className='text-textWhite text-xl font-bold'>
            Your Meson Wallet
          </span>
          <Spacer size={16} axis={'vertical'} />
          <div className='flex flex-col w-full p-4 box-border rounded-2xl bg-bgDarkLight'>
            <span className='text-textWhite'>Selected wallet</span>

            <Spacer size={16} axis={'vertical'} />

            <div className='flex flex-col items-center'>
              <Blockies
                seed={ethAddress}
                scale={6}
                className='identicon rounded-full'
              />
              <span className='text-sm'>My wallet</span>
              <div className='flex flex-row items-center'>
                <span className='text-textWhite text-sm font-bold'>
                  eth:&nbsp;
                </span>
                <span className='text-textWhite text-base font-normal'>
                  {trimAddress(ethAddress)}
                </span>
              </div>
              <div className='flex flex-row items-center'>
                <CopyToClipboardBtn textToCopy={ethAddress} />
                <Spacer size={8} axis={'horizontal'} />
                <ViewOn address={ethAddress} />
              </div>
              <Spacer size={8} axis={'vertical'} />
              <Option options={mockNetworks} />
            </div>
          </div>
          <Spacer size={24} axis={'vertical'} />
          <div className='flex flex-row justify-between'>
            <Button
              btnVariant={'border'}
              btnSize={'md'}
              btnType={'button'}
              handleClick={() => {
                console.log('Switch wallet');
              }}
            >
              Switch wallet
            </Button>
            <Button
              btnVariant={'alert'}
              btnSize={'md'}
              btnType={'button'}
              handleClick={() => {
                console.log('Disconnect wallet');
              }}
            >
              Disconnect
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ConnectedMesonWallet;
