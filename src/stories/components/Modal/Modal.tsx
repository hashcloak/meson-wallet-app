import { Dialog as HuiDialog } from '@headlessui/react'
import React, { useState } from 'react'

import Button from '../Button/Button'

import Spacer from '~/utils/Spacer'

type Props = {
  isOpen: boolean
  body: React.ReactElement
  buttons: React.ReactElement
  onClose: () => void
}

const Modal: React.FC<Props> = ({ isOpen, body, buttons, onClose }) => {
  return (
    <>
      <HuiDialog
        open={isOpen}
        onClose={onClose}
        className='fixed z-10 inset-0 overflow-y-auto'
      >
        <div className='flex items-center justify-center min-h-screen'>
          <HuiDialog.Overlay className='fixed inset-0 bg-black opacity-30' />
          <div className='relative bg-bgDarkMid rounded-2xl max-w-4xl mx-auto py-6 px-8 '>
            <div className='flex flex-row justify-between w-full'>
              <HuiDialog.Title className='Description-lg font-medium leading-6 text-textWhite text-2xl'>
                Remove wallet
              </HuiDialog.Title>
              <button onClick={onClose}>
                <img
                  src='/close_white_24dp.svg'
                  alt='close-wh'
                  className='w-6 object-contain'
                />
              </button>
            </div>
            <HuiDialog.Description className='mt-6'>
              <div className='rounded-2xl p-4 bg-bgDarkLight'>
                {/* Description */}
                {body}
                {/* Description */}
              </div>
            </HuiDialog.Description>
            <div className='flex flex-row justify-around items-center mt-6'>
              {/* Button */}
              {buttons}
              {/* Button */}
            </div>
          </div>
        </div>
      </HuiDialog>
    </>
  )
}

export default Modal
