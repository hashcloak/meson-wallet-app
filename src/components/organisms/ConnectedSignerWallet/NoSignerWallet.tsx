import CustomLink from '~/components/atoms/CustomLink';
import { Icon } from '~/components/atoms/Icon';
import SignerWallets from '~/components/molecules/SignerWallets';
import Spacer from '~/utils/Spacer';

const NoSignerWallet: React.FC = () => {
  return (
    <div className='w-[22rem] rounded-2xl bg-bgDarkMid px-8 py-6'>
      <span className='text-textWhite text-xl font-bold'>
        Connect a signer wallet
      </span>

      <Spacer size={16} axis={'vertical'} />

      <div className='flex flex-col w-full p-4 box-border rounded-2xl bg-bgDarkLight'>
        <div className='flex flex-col items-center w-full'>
          <Icon type={'AccountCircle'} size={'xxl'} color={'white'} />

          <Spacer size={8} axis={'vertical'} />

          <div>
            <span className='text-base text-textWhite'>
              In order to select the network to create your Meson Wallet, your
              wallet needs to be connected.
            </span>
            <br />
            <CustomLink url={''} size={'base'}>
              Why do you need to connect a signer wallet?
            </CustomLink>
          </div>

          <Spacer size={16} axis={'vertical'} />

          <div className='w-full'>
            <span className='text-textWhite text-base font-bold'>
              Available Wallets
            </span>
            <Spacer size={8} axis={'vertical'} />
            <div className='grid grid-cols-1 gap-2'>
              <SignerWallets />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoSignerWallet;
