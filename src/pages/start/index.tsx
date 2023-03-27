import Image from 'next/image'
import { Button } from '@/components/atoms/Button'
import { IconText } from '@/components/molecules/IconText'
import LastOpenedWallet from '@/components/templates/LastOpenedWallet'
import Topbar from '@/components/templates/Topbar'
import { mockLastOpenedWallets as wallets } from '@/utils/Mock'
import Spacer from '@/utils/Spacer'

const Start = () => {
  return (
    <div className='w-screen h-screen flex flex-col'>
      <Topbar />

      <div className='flex flex-col justify-center items-center w-full h-full box-border py-8 px-[4.5rem] bg-bgDark'>
        <Image src='/Meson_start_logo.png' alt='mesonTopbarLogo' width='176' height='40' />

        <Spacer size={16} axis={'vertical'} />
        <LastOpenedWallet wallets={wallets} />
        <Spacer size={16} axis={'vertical'} />
        <div className='flex flex-row justify-between items-center w-[51rem] '>
          <Button btnVariant={'special'} btnSize={'sp'} btnType={'button'}>
            <IconText iconType={'CreateNew'} iconColor={'white'}>
              Create new wallet
            </IconText>
          </Button>
          <Button btnVariant={'special'} btnSize={'sp'} btnType={'button'}>
            <IconText iconType={'AddExist'} iconColor={'white'}>
              Add existing wallet
            </IconText>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Start
