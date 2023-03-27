import { Dialog } from '@headlessui/react'
import React from 'react'
import { Button } from '@/components/atoms/Button'
import { Icon } from '@/components/atoms/Icon'
import { RowBodyLong, RowBodyType } from '@/components/organisms/RowBody'
import EthAddress from '@/utils/Ethereum/EthAddress'
import Spacer from '@/utils/Spacer'

type Props = {
  isOpen: boolean
  onClose: () => void
  tx: RowBodyType
}

export const TxContents = () => {
  return (
    <>
      <div className='flex flex-row justify-between w-full'>
        {/* Left content */}
        <div className='flex flex-col'>
          <div>
            <span className='text-textWhite'>
              Send <span className='font-bold'>0.00062 ETH</span> to:
            </span>
            <div className='flex flex-row items-center pl-6 mt-2'>
              <EthAddress
                ethAddress='0xf86B25473cC08F04DA275B2847F2448cf041Fbd5'
                size={4.5}
                length='full'
              />
            </div>
          </div>

          <Spacer size={32} axis={'vertical'} />
          <div className='text-textWhite'>
            <div className='grid grid-cols-[20%_1fr]'>
              <div className='font-bold text-sm flex flex-col'>
                <span>Tx Hash</span>
                <span>Created</span>
                <span>Executed</span>
                <Spacer size={16} axis={'vertical'} />
                <span>Operation</span>
                <span>TxGas</span>
                <span>baseGas</span>
                <span>gasPrice</span>
                <span>gasToken</span>
                <span>gasToken</span>
                <span>Signature 1</span>
              </div>
              <div className='text-sm flex flex-col'>
                <span>0x7bbe9EEc7a61Ac4E655ffEFed478d5F833181422</span>
                <span>Jul 11. 2022 - 4:40:40 PM</span>
                <span>n/a</span>
                <Spacer size={16} axis={'vertical'} />
                <span>0 (call)</span>
                <span>42101</span>
                <span>0</span>
                <span>0</span>
                <span>0x00000000...00000000</span>
                <span>0x00000000...00000000</span>
                <span>65 bytes</span>
              </div>
            </div>
          </div>
        </div>
        <Spacer size={48} axis={'horizontal'} />

        <div className='flex flex-col justify-start'>
          <div className='flex flex-row mb-2'>
            <Icon type={'CheckCircle'} size={'lg'} color={'main'} />
            <span className='text-main font-bold ml-2'>Created</span>
          </div>

          <div className='flex flex-col mb-2'>
            <div className='flex flex-row'>
              <Icon type={'CheckCircle'} size={'lg'} color={'main'} />

              <span className='text-main font-bold ml-2'>
                Confirmed
                <span className='text-textWhite text-sm font-normal ml-2'>(1 of 2)</span>
              </span>
            </div>
            <div className='flex flex-row items-center pl-6 mt-2'>
              <EthAddress
                ethAddress='0xD9Be7c81641BdfC2D82cAC5052455aD5313Ea5DF'
                size={4.5}
                length='full'
              />
            </div>
          </div>

          <div className='flex flex-col mb-2'>
            <div className='flex flex-row'>
              <Icon type={'Circle'} size={'lg'} color={'light'} />
              <span className='text-light font-bold ml-2'>
                Awaiting confirmations
                <span className='text-textWhite text-sm font-normal ml-2'>(1 of 2)</span>
              </span>
            </div>

            <div className='flex flex-row items-center pl-6 mt-2'>
              <EthAddress
                ethAddress='0xfF501B324DC6d78dC9F983f140B9211c3EdB4dc7'
                size={4.5}
                length='full'
              />
            </div>
          </div>

          <div className='flex flex-col mb-2'>
            <div className='flex flex-row'>
              <Icon type={'Circle'} size={'lg'} color={'white'} />
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

const TxModal: React.FC<Props> = ({ isOpen, onClose, tx }) => {
  console.log('modal', tx)
  return (
    <>
      {tx && (
        <Dialog open={isOpen} onClose={onClose} className='fixed z-10 inset-0 overflow-y-auto'>
          <div className='flex items-center justify-center min-h-screen'>
            <Dialog.Overlay
              className='fixed inset-0 bg-neutral-900 opacity-30'
              aria-hidden='true'
            />
            <Dialog.Panel className='relative bg-bgDarkMid rounded-2xl mx-auto'>
              <div className='flex items-center justify-between rounded-t-2xl px-4 h-16 bg-bgDarkLight whitespace-nowrap'>
                <RowBodyLong
                  timestamp={tx.timestamp!}
                  status={tx.status}
                  to={tx.to}
                  from={tx.from}
                  token={tx.token}
                  amount={tx.amount}
                  isSuccess={tx.isSuccess}
                  numOfConfirmation={tx.numOfConfirmation}
                />
              </div>

              <Dialog.Description className='p-6'>
                {/* Description */}
                <TxContents />
                {/* Description */}
              </Dialog.Description>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </>
  )
}

export default TxModal
