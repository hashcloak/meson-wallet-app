import { Dialog } from '@headlessui/react'
import React from 'react'

import EthAddress from '../../../utils/Ethereum/EthAddress'
import Button from '../../atoms/Button/Button'
import { Icon } from '../../atoms/Icon/Icon'
import { RowBodyLong, RowBodyType } from '../../organisms/Table/CustomTable'

import Spacer from '~/utils/Spacer'

type Props = {
  isOpen: boolean
  onClose: () => void
  tx: RowBodyType
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
              <EthAddress
                ethAddress='0xf86B25473cC08F04DA275B2847F2448cf041Fbd5'
                size={4.5}
                length='full'
              />
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
            <Icon type={'CheckCircle'} size={'lg'} color={'main'} />
            <span className='text-main font-bold ml-2'>Created</span>
          </div>

          <div className='flex flex-col mb-2'>
            <div className='flex flex-row'>
              <Icon type={'CheckCircle'} size={'lg'} color={'main'} />

              <span className='text-main font-bold ml-2'>
                Confirmed
                <span className='text-textWhite text-sm font-normal ml-2'>
                  (1 of 2)
                </span>
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
                <span className='text-textWhite text-sm font-normal ml-2'>
                  (1 of 2)
                </span>
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
                <TxDetails />
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
