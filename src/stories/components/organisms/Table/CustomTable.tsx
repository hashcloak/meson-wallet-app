import React, { useState } from 'react'

import Button from '../../atoms/Button/Button'
import TxModal from '../../molecules/Modal/TxModal'

import Spacer from '~/utils/Spacer'

export const RowBodyLong = () => {
  return (
    <div className='grid grid-cols-2 gap-32'>
      <div className='grid grid-cols-2 items-center'>
        <div className='flex flex-row items-center'>
          <img className='object-contain w-8 mr-2' src='../public/send.png' />
          <span className='text-textWhite font-bold text-base'>Send</span>
        </div>

        <div className='flex flex-col justify-items-start'>
          <div className='flex flex-row items-center'>
            <img
              className='object-contain w-6 mr-2'
              src='../public/eth_icon.png'
            />
            <span className='text-textWhite font-bold text-lg'>
              - 0.00062 ETH
            </span>
          </div>
          <span className='text-textGrayLight text-xs'>
            To: 0xf86B25473cC08F04DA275B2847F2448cf041Fbd5
          </span>
        </div>
      </div>

      <div className='grid grid-cols-3 items-center'>
        <div className='flex flex-col items-start'>
          <span className='text-textWhite text-sm'>28 Sep 2022</span>
          <span className='text-textGrayLight text-xs'>10:23 AM</span>
        </div>

        <div className='flex flex-col items-start'>
          <span className='text-textGrayLight text-xs'>1 out of 2</span>
        </div>

        <div className='flex flex-col items-start '>
          <span className='text-textWhite text-sm'>Needs confirmation</span>
        </div>
      </div>
    </div>
  )
}

export const RowBodyShort = () => {
  return (
    <>
      <img className='object-contain w-8' src='../public/send.png' />
      <Spacer size={16} axis={'horizontal'} />
      <div className='flex flex-col justify-start w-full'>
        <div className='flex flex-row items-center'>
          <img
            className='object-contain w-6 mr-2'
            src='../public/eth_icon.png'
          />
          <span className='text-textWhite font-bold text-lg'>
            - 0.00062 ETH
          </span>
        </div>
        <span className='text-textGrayLight text-xs'>
          To: 0xf86B25473cC08F04DA275B2847F2448cf041Fbd5
        </span>
      </div>
      <Spacer size={16} axis={'horizontal'} />
      <div className='flex flex-col items-start  w-full'>
        <span className='text-textWhite text-sm'>28 Sep 2022</span>
        <span className='text-textGrayLight text-xs'>10:23 AM</span>
      </div>
      <Spacer size={16} axis={'horizontal'} />
      <div className='flex flex-col items-start w-full'>
        <span className='text-textWhite text-sm'>Needs confirmation</span>
        <span className='text-textGrayLight text-xs'>1 out of 2</span>
      </div>
    </>
  )
}

// TODO: TableShortRow and TableLongRow needs to receive props to display info.
export const TableShortRow = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => {
    setIsOpen(!isOpen)
  }

  const body = (
    <p>
      You are removing a Meson Wallet ONLY from your interface. It does not
      delete the Meson wallet. You can always add it back using the above Meson
      wallet’s address
    </p>
  )
  const buttons = (
    <>
      <Button
        btnVariant={'text'}
        btnSize={'md'}
        btnType={'button'}
        handleClick={onClose}
      >
        Close
      </Button>
      <Button
        btnVariant={'primary'}
        btnSize={'md'}
        btnType={'button'}
        handleClick={onClose}
      >
        Submit
      </Button>
    </>
  )
  return (
    <>
      <button
        className='flex items-center rounded-2xl px-4 h-16 bg-bgDarkLight hover:bg-dark whitespace-nowrap'
        onClick={() => setIsOpen(!isOpen)}
      >
        <RowBodyShort />
      </button>
      <TxModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export const TableLongRow = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => {
    setIsOpen(!isOpen)
  }

  const body = (
    <p>
      You are removing a Meson Wallet ONLY from your interface. It does not
      delete the Meson wallet. You can always add it back using the above Meson
      wallet’s address
    </p>
  )
  const buttons = (
    <>
      <Button
        btnVariant={'text'}
        btnSize={'md'}
        btnType={'button'}
        handleClick={onClose}
      >
        Close
      </Button>
      <Button
        btnVariant={'primary'}
        btnSize={'md'}
        btnType={'button'}
        handleClick={onClose}
      >
        Submit
      </Button>
    </>
  )
  return (
    <>
      <button
        className='flex items-center justify-between rounded-2xl px-4 h-16 bg-bgDarkLight hover:bg-dark whitespace-nowrap w-full'
        onClick={() => setIsOpen(!isOpen)}
      >
        <RowBodyLong />
      </button>
      <TxModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}

type Props = {
  size: 'short' | 'long'
}

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
            <TableShortRow />
            <TableShortRow />
            <TableShortRow />
          </div>
        ) : (
          <div className='grid grid-flow-row gap-2'>
            <TableLongRow />
            <TableLongRow />
            <TableLongRow />
            <TableLongRow />
            <TableLongRow />
            <TableLongRow />
          </div>
        )}
      </div>
    </>
  )
}

export default CustomTable
