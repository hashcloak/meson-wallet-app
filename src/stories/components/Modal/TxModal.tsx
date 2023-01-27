import { Dialog } from '@headlessui/react'
import React from 'react'

import Button from '../Button/Button'
import EthAddress from '../Ethereum/EthAddress'
import { RowBodyLong } from '../Table/Table'

import Spacer from '~/utils/Spacer'

type Props = {
  isOpen: boolean
  body: React.ReactElement
  buttons?: React.ReactElement
  onClose: () => void
}

const TxDetails = () => {
  return (
    <>
      <div className='flex flex-row bg-'>
        {/* Left content */}
        <div className='flex flex-col'>
          <div>
            <span className='text-textWhite'>
              Send <span className='font-bold'>0.00062 ETH</span> to:
            </span>
            <div className='flex flex-row items-center pl-6 mt-2'>
              <img
                src='./identicon03.png'
                alt='identicon_03'
                className='w-8 object-contain'
              />
              <EthAddress ethAddress='0xf86B25473cC08F04DA275B2847F2448cf041Fbd5' />
              {/* <span className='text-textWhite text-sm font-normal ml-2'>
                eth: 0xf86B25473cC08F04DA275B2847F2448cf041Fbd5
              </span> */}
            </div>
          </div>

          <Spacer size={32} axis={'vertical'} />
          <div className='text-textWhite'>
            <table className='table-auto border-separate border-spacing-x-2	text-left text-sm'>
              <tr>
                <th>Tx Hash</th>
                <td>0x7bbe9EEc7a61Ac4E655ffEFed478d5F833181422</td>
              </tr>

              <tr>
                <th>Created</th>
                <td>Jul 11. 2022 - 4:40:40 PM</td>
              </tr>

              <tr>
                <th>Executed</th>
                <td>n/a</td>
              </tr>

              <Spacer size={16} axis={'vertical'} />

              <tr>
                <th>Operation</th>
                <td>0 (call)</td>
              </tr>

              <tr>
                <th>TxGas</th>
                <td>42101</td>
              </tr>

              <tr>
                <th>baseGas</th>
                <td>0</td>
              </tr>

              <tr>
                <th>gasPrice</th>
                <td>0</td>
              </tr>

              <tr>
                <th>gasToken</th>
                <td>0x00000000...00000000</td>
              </tr>

              <tr>
                <th>gasToken</th>
                <td>0x00000000...00000000</td>
              </tr>

              <tr>
                <th>Signature 1</th>
                <td>65 bytes</td>
              </tr>
            </table>
          </div>
        </div>
        <Spacer size={48} axis={'horizontal'} />

        <div className='flex flex-col justify-start'>
          <div className='flex flex-row mb-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='24px'
              viewBox='0 0 24 24'
              width='24px'
              fill='#38C6F4'
            >
              <path d='M0 0h24v24H0z' fill='none' />
              <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' />
            </svg>
            <span className='text-main font-bold ml-2'>Created</span>
          </div>

          <div className='flex flex-col mb-2'>
            <div className='flex flex-row'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='24px'
                viewBox='0 0 24 24'
                width='24px'
                fill='#38C6F4'
              >
                <path d='M0 0h24v24H0z' fill='none' />
                <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' />
              </svg>
              <span className='text-main font-bold ml-2'>
                Confirmed
                <span className='text-textWhite text-sm font-normal ml-2'>
                  (1 of 2)
                </span>
              </span>
            </div>
            <div className='flex flex-row items-center pl-6 mt-2'>
              <img
                src='./identicon01.png'
                alt='identicon_01'
                className='w-8 object-contain'
              />
              <span className='text-textWhite text-sm font-normal ml-2'>
                eth: 0xfF501B324DC6d78dC9F983f140B9211c3EdB4dc7
              </span>
            </div>
          </div>

          <div className='flex flex-col mb-2'>
            <div className='flex flex-row'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='24px'
                viewBox='0 0 24 24'
                width='24px'
                fill='#FF9169'
              >
                <path d='M0 0h24v24H0z' fill='none' />
                <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z' />
              </svg>
              <span className='text-light font-bold ml-2'>
                Awaiting confirmations
                <span className='text-textWhite text-sm font-normal ml-2'>
                  (1 of 2)
                </span>
              </span>
            </div>

            <div className='flex flex-row items-center pl-6 mt-2'>
              <img
                src='./identicon02.png'
                alt='identicon_02'
                className='w-8 object-contain'
              />
              <span className='text-textWhite text-sm font-normal ml-2'>
                eth: 0xfF501B324DC6d78dC9F983f140B9211c3EdB4dc7
              </span>
            </div>
          </div>

          <div className='flex flex-col mb-2'>
            <div className='flex flex-row'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='24px'
                viewBox='0 0 24 24'
                width='24px'
                fill='#D9D9D9'
              >
                <path d='M0 0h24v24H0z' fill='none' />
                <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z' />
              </svg>
              <span className='text-textWhite font-bold ml-2'>Execution</span>
            </div>

            <span className='text-textWhite text-sm font-normal pl-6'>
              Can be executed once the threshold is reached
            </span>
          </div>

          <div className='flex flex-row justify-around mt-6'>
            <Button btnVariant={'primary'} btnSize={'md'} btnType={'button'}>
              Confirm
            </Button>
            <Button btnVariant={'alert'} btnSize={'md'} btnType={'button'}>
              Reject
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

const TxModal: React.FC<Props> = ({ isOpen, body, buttons, onClose }) => {
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={onClose}
        className='fixed z-10 inset-0 overflow-y-auto'
      >
        <div className='flex items-center justify-center min-h-screen'>
          <Dialog.Overlay
            className='fixed inset-0 bg-neutral-900 opacity-30'
            aria-hidden='true'
          />
          <Dialog.Panel className='relative bg-bgDarkMid rounded-2xl mx-auto'>
            <div className='flex items-center justify-between rounded-t-2xl px-4 h-16 bg-bgDarkLight hover:bg-dark whitespace-nowrap'>
              <RowBodyLong />
            </div>

            <Dialog.Description className='p-6'>
              {/* Description */}
              <TxDetails />
              {/* Description */}
            </Dialog.Description>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}

export default TxModal

{
  /* <button onClick={onClose}>
<img
  src='/close_white_24dp.svg'
  alt='close-wh'
  className='w-6 object-contain'
/>
</button> */
}
