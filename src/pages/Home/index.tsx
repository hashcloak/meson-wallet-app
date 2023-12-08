import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '~/components/atoms/Button';
import { IconText } from '~/components/molecules/IconText';
import LastOpenedWallet from '~/components/templates/LastOpenedWallet';
import Topbar from '~/components/templates/Topbar';
// import { mockLastOpenedWallets as wallets } from '~/utils/Mock';
import Spacer from '~/utils/Spacer';

export const Home: FC = () => {
  return (
    <div className='w-screen h-screen flex flex-col'>
      <Topbar />

      <div className='flex flex-col justify-center items-center w-full h-full box-border py-8 px-[4.5rem] bg-bgDark'>
        <img
          src='/assets/Meson_start_logo.png'
          alt='Meson Logo'
          width='176'
          height='40'
        />

        <Spacer size={16} axis={'vertical'} />
        <LastOpenedWallet />
        <Spacer size={16} axis={'vertical'} />
        <div className='flex flex-row justify-between items-center w-[51rem] '>
          <Link to='/create-new/step1' className='w-full'>
            <Button btnVariant={'special'} btnSize={'sp'} btnType={'button'}>
              <IconText iconType={'CreateNew'} iconColor={'white'}>
                Create new wallet
              </IconText>
            </Button>
          </Link>
          <Link to='/add-existing/step1' className='w-full'>
            <Button btnVariant={'special'} btnSize={'sp'} btnType={'button'}>
              <IconText iconType={'AddExist'} iconColor={'white'}>
                Add existing wallet
              </IconText>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
