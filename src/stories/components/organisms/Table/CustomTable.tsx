import React, { useState } from 'react'

import Button from '../../atoms/Button/Button'
import { Icon, IconTypes } from '../../atoms/Icon/Icon'
import { Logo, LogoTypes } from '../../atoms/Icon/Logo'
import { StatusTypes, TxStatus } from '../../molecules/IconText/TxStatus'
import TxModal from '../../molecules/Modal/TxModal'

import { unixTimeConverter } from '~/stories/utils/unixTimeConverter'
import Spacer from '~/utils/Spacer'

export type RowBodyType = {
  amount?: number | string
  token?: string
  to?: string
  from?: string
  timestamp: number
  status: StatusTypes
  numOfConfirmation?: number
  isSuccess?: boolean
}

export const RowBodyLong: React.FC<RowBodyType> = ({
  amount,
  token,
  to,
  from,
  timestamp,
  status,
  numOfConfirmation,
  isSuccess,
}) => {
  const { date, time } = unixTimeConverter(timestamp)

  return (
    <div className='grid grid-cols-2 gap-32'>
      <div className='grid grid-cols-2 items-center'>
        <div className='flex flex-row items-center'>
          <TxStatus type={status} size={'xl'} color={'white'} />
          <span className='text-textWhite font-bold text-base'>{status}</span>
        </div>

        <div className='flex flex-col justify-items-start'>
          <div className='flex flex-row items-center'>
            <Logo type={`${token}Logo` as LogoTypes} size={'lg'} />
            <Spacer size={8} axis={'horizontal'} />
            <span className='text-textWhite font-bold text-lg'>
              {amount} {token?.toUpperCase()}
            </span>
          </div>
          {to ? (
            <span className='text-textGrayLight text-xs'>To: {to}</span>
          ) : (
            <span className='text-textGrayLight text-xs'>From: {from}</span>
          )}
        </div>
      </div>

      <div className='grid grid-cols-3 items-center'>
        <div className='flex flex-col items-start'>
          <span className='text-textWhite text-sm'>{date}</span>
          <span className='text-textGrayLight text-xs'>{time}</span>
        </div>
        {numOfConfirmation && !isSuccess ? (
          <>
            <div className='flex flex-col items-start'>
              <span className='text-textGrayLight text-xs'>
                {' '}
                {numOfConfirmation} out of 2
              </span>
            </div>
            <div className='flex flex-col items-start '>
              <span className='text-textWhite text-sm'>Needs confirmation</span>
            </div>{' '}
          </>
        ) : (
          <span className='text-textWhite text-sm'>{isSuccess}</span>
        )}
      </div>
    </div>
  )
}

export const RowBodyShort: React.FC<RowBodyType> = ({
  amount,
  token,
  to,
  from,
  timestamp,
  status,
  numOfConfirmation,
  isSuccess,
}) => {
  const { date, time } = unixTimeConverter(timestamp)
  return (
    <div className='flex flex-row justify-between items-center w-full'>
      <TxStatus type={status} size={'xl'} color={'white'} />
      <Spacer size={16} axis={'horizontal'} />
      <div className='flex flex-col justify-start w-full h-full'>
        <div className='flex flex-row items-center'>
          <Logo type={`${token}Logo` as LogoTypes} size={'lg'} />
          <Spacer size={8} axis={'horizontal'} />
          <span className='text-textWhite font-bold text-lg'>
            {amount} {token?.toUpperCase()}
          </span>
        </div>
        {to ? (
          <span className='text-textGrayLight text-xs'>To: {to}</span>
        ) : (
          <span className='text-textGrayLight text-xs'>From: {from}</span>
        )}
      </div>
      <Spacer size={16} axis={'horizontal'} />
      <div className='flex flex-col items-start w-full h-full'>
        <span className='text-textWhite text-sm'>{date}</span>
        <span className='text-textGrayLight text-xs'>{time}</span>
      </div>
      <Spacer size={16} axis={'horizontal'} />
      <div className='flex flex-col items-start w-full h-full'>
        {numOfConfirmation && !isSuccess ? (
          <>
            <span className='text-textWhite text-sm'>Needs confirmation</span>
            <span className='text-textGrayLight text-xs'>
              {numOfConfirmation} out of 2
            </span>
          </>
        ) : (
          <span className='text-textWhite text-sm'>{isSuccess}</span>
        )}
      </div>
    </div>
  )
}

type TableRowType = {
  tx: RowBodyType
}

// TODO: TableShortRow and TableLongRow needs to receive props to display info.
export const TableShortRow: React.FC<TableRowType> = ({ tx }) => {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <button
        className='flex items-center rounded-2xl px-4 h-16 bg-bgDarkLight hover:bg-dark whitespace-nowrap mb-2 w-full'
        onClick={() => setIsOpen(!isOpen)}
      >
        <RowBodyShort
          timestamp={tx.timestamp}
          status={tx.status}
          to={tx.to}
          from={tx.from}
          token={tx.token}
          amount={tx.amount}
          isSuccess={tx.isSuccess}
          numOfConfirmation={tx.numOfConfirmation}
        />
      </button>
      <TxModal isOpen={isOpen} onClose={onClose} tx={tx} />
    </>
  )
}

export const TableLongRow: React.FC<TableRowType> = ({ tx }) => {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <button
        className='flex items-center justify-between rounded-2xl px-4 h-16 bg-bgDarkLight hover:bg-dark whitespace-nowrap mb-2 w-full'
        onClick={() => setIsOpen(!isOpen)}
      >
        <RowBodyLong
          timestamp={tx.timestamp}
          status={tx.status}
          to={tx.to}
          from={tx.from}
          token={tx.token}
          amount={tx.amount}
          isSuccess={tx.isSuccess}
          numOfConfirmation={tx.numOfConfirmation}
        />
      </button>
      <TxModal isOpen={isOpen} onClose={onClose} tx={tx} />
    </>
  )
}

type Props = {
  size: 'short' | 'long'
}

export const mockTransactions: RowBodyType[] = [
  {
    amount: '- 0.00062',
    token: 'Eth',
    to: '0xf86B25473cC08F04DA275B2847F2448cf041Fbd5',
    from: undefined,
    timestamp: 1677055246,
    status: 'Send',
    numOfConfirmation: 1,
    isSuccess: false,
  },
  {
    amount: '+ 0.00062',
    token: 'Dai',
    to: '0xf86B25473cC08F04DA275B2847F2448cf041Fbd5',
    from: undefined,
    timestamp: 1674376846,
    status: 'Send',
    numOfConfirmation: 1,
    isSuccess: false,
  },
]

const CustomTable: React.FC<Props> = ({ size }) => {
  return (
    <>
      <div className='overflow-x-auto w-full bg-bgDarkMid rounded-2xl py-4 px-8'>
        {/* <TableHeader /> */}
        <div className='flex flex-row justify-between'>
          <span className='text-textWhite text-lg'>Queue</span>
          <a className='text-textLink text-sm'>more</a>
        </div>
        {size === 'short' ? (
          <div className='grid grid-rows-3 gap-2'>
            {mockTransactions.map((tx) => (
              <TableShortRow tx={tx} key={tx.timestamp} />
            ))}
          </div>
        ) : (
          <div className='grid grid-flow-row gap-2'>
            {mockTransactions.map((tx) => (
              <TableLongRow tx={tx} key={tx.timestamp} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default CustomTable
