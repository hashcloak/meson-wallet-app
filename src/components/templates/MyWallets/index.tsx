import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from '@/components/atoms/Button'
import { Icon } from '@/components/atoms/Icon'
import { SidebarIconText } from '@/components/molecules/IconText'
import { EthAddress } from '@/utils/Ethereum'
import Spacer from '@/utils/Spacer'

const MyWallets = () => {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => setIsOpen((prevState) => !prevState)

  return (
    <div className='drawer'>
      <input id='my-drawer' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content'>
        <label htmlFor='my-drawer' className=' h-16 w-20 drawer-button'>
          <SidebarIconText type={'AddCircle'} text={'Add new'} />
        </label>
      </div>

      <div className='drawer-side'>
        <label htmlFor='my-drawer' className='drawer-overlay'></label>

        <div className='flex flex-col menu p-4 w-96 bg-base-100 text-base-content'>
          {/* Current wallet */}
          <span className='text-3xl font-bold'>My wallets</span>
          <Spacer size={32} axis='vertical' />
          <div className='w-full'>
            <div className='bg-gradient-to-r from-[#CFC3FA] to-[#A5FCF4] text-textBlack text-center w-full h-6 rounded-md font-bold text-sm mb-2'>
              Ethereum
            </div>
            <div className='bg-dark rounded-2xl flex justify-between p-2 flex-row items-center'>
              <EthAddress
                ethAddress={'0xfF501B324DC6d78dC9F983f140B9211c3EdB4dc7'}
                walletName={'My wallet'}
                size={0}
                length={'short'}
                icons={false}
              />
              <div className='flex flex-row justify-center items-center'>
                <Icon type={'Avatar'} size={'lg'} color={'gray'} />
                <span className='text-sm text-textGrayLight'>Owner</span>
              </div>
            </div>
          </div>

          <Spacer size={48} axis='vertical' />

          {/* Other wallets */}
          <div className='w-full'>
            <div className='bg-[#4C98EB] text-textWhite text-center w-full h-6 rounded-md font-bold text-sm mb-2'>
              Göerli
            </div>
            <div
              className='rounded-2xl flex justify-between p-2 flex-row items-center hover:bg-dark'
              onClick={() => console.log('clicked')}
              role='button'
              tabIndex={0}
            >
              <EthAddress
                ethAddress={'0xc740145D4b8b95F44Cd9e00acEA006B02d505E2E'}
                walletName={'Test wallet'}
                size={0}
                length={'short'}
                icons={false}
              />
              <div className='flex flex-row justify-center items-center'>
                <Icon type={'Visibility'} size={'lg'} color={'gray'} />
                <span className='text-sm text-textGrayLight'>Read only</span>
              </div>
            </div>
            <div
              className='rounded-2xl flex justify-between p-2 flex-row items-center hover:bg-dark'
              onClick={() => console.log('clicked')}
              role='button'
              tabIndex={0}
            >
              <EthAddress
                ethAddress={'0xc740145D4b8b95F44Cd9e00acEA006B02d505E2E'}
                walletName={'Test wallet'}
                size={0}
                length={'short'}
                icons={false}
              />
              <div className='flex flex-row justify-center items-center'>
                <Icon type={'Visibility'} size={'lg'} color={'gray'} />
                <span className='text-sm text-textGrayLight'>Read only</span>
              </div>
            </div>
          </div>

          <Spacer size={48} axis='vertical' />

          {/* Buttons */}
          <div className='w-full flex flex-row justify-between'>
            <Link href={'/createNew'}>
              <Button btnSize='md'>
                <span className='flex flex-row justify-center items-center'>
                  <Icon type={'Edit'} size={'lg'} color={'white'} />
                  <span className='text-base text-textWhite ml-2'>Create new</span>
                </span>
              </Button>
            </Link>
            <Link href={'/addExisting'}>
              <Button btnVariant='border' btnSize='md'>
                <span className='flex flex-row justify-center items-center'>
                  <Icon type={'AddExist'} size={'lg'} color={'white'} />
                  <span className='text-base ml-2'>Add existing</span>
                </span>
              </Button>
            </Link>
          </div>
        </div>
        {/* <ul className='menu p-4 w-80 bg-base-100 text-base-content'>
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul> */}
      </div>
    </div>
  )
}

export default MyWallets
