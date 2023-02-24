import { Dialog } from '@headlessui/react'
import React, { useEffect, useState } from 'react'

import { ModalProps } from './NewTxModal'

const ReceiveTxDetails = () => {
  return (
    <div className='flex flex-col text-textWhite'>
      <div className='py-4 px-8 rounded-2xl bg-bgDarkLight'>
        <div className='flex flex-col items-center'>
          <span className='text-3xl font-bold'>$ 100.00</span>
          <span className='text-textGrayLight text-sm'>≈ $ 100.00</span>
        </div>
        receive
        <div className='flex flex-row justify-around' />
      </div>
    </div>
  )
}

type Props = {
  isOpen: boolean | undefined
  onClose: () => void
}

const ReceiveTxModal: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={onClose}
          className='fixed z-10 inset-0 overflow-y-auto'
          static
        >
          <div className='flex items-center justify-center min-h-screen'>
            <Dialog.Overlay
              className='fixed inset-0 bg-neutral-900 opacity-30'
              aria-hidden='true'
            />
            <Dialog.Panel className='relative bg-bgDarkMid rounded-2xl py-6 px-8'>
              <span className='text-textWhite text-2xl font-bold'>
                Send transaction
              </span>

              <Dialog.Description className='p-6'>
                {/* Description */}
                <ReceiveTxDetails />
                {/* Description */}
              </Dialog.Description>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </>
  )
}

export default ReceiveTxModal
