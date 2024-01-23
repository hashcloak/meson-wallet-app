import { Icon } from '~/components/atoms/Icon';
import Spacer from '~/utils/Spacer';

const NoSignerWalletBtn: React.FC = () => {
  return (
    <div className='flex flex-row items-center justify-center min-w-[14rem]'>
      <Icon type={'AccountCircle'} size={'xxl'} color={'white'} />
      <Spacer size={8} axis={'horizontal'} />
      <div className='flex flex-col items-start'>
        <span className='text-textGray dark:text-textWhite text-base font-bold'>
          Not Connected
        </span>
        <span className='text-alert text-xs font-normal'>
          Connect a signer wallet
        </span>
      </div>
    </div>
  );
};

export default NoSignerWalletBtn;
