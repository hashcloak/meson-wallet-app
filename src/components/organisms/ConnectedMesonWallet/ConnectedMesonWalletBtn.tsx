import Blockies from 'react-blockies';
import { Icon } from '~/components/atoms/Icon';
import Spacer from '~/utils/Spacer';
import { ConnectedMesonWalletProps } from './ConnectedMesonWallet';
import { trimAddress } from '~/utils/trimAddress';

// TODO: This needs to be dynamically change based on the props
const ConnectedMesonWalletBtn: React.FC<ConnectedMesonWalletProps> = ({
  ethAddress = '',
  isConnected,
}) => {
  return (
    <>
      {isConnected && ethAddress.length ? (
        <div className='flex flex-row items-center'>
          <Blockies
            seed={ethAddress}
            scale={4}
            className='identicon rounded-full'
          />
          <Spacer size={8} axis={'horizontal'} />
          <div className='flex flex-col items-start'>
            <span className='text-sm'>My wallet</span>
            <div className='flex flex-row items-center'>
              <span className='text-textGray dark:text-textWhite text-sm font-bold'>
                eth:&nbsp;
              </span>
              <span className='text-textGray dark:text-textWhite text-base font-normal'>
                {trimAddress(ethAddress)}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex justify-center min-w-[11rem]'>
          <Icon type={'MesonCircle'} size={'xl'} color={'none'} />
        </div>
      )}
    </>
  );
};

export default ConnectedMesonWalletBtn;
