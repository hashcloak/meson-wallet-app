import { Dialog } from '@headlessui/react'
import React from 'react'

import { Icon } from '../atoms/Icon/Icon'

type Props = {
  isOpen: boolean
  body: React.ReactElement
  buttons?: React.ReactElement
  onClose: () => void
}

const Modal: React.FC<Props> = ({ isOpen, body, buttons, onClose }) => {
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
          <Dialog.Panel className='relative bg-bgDarkMid rounded-2xl max-w-4xl mx-auto py-6 px-8 '>
            <div className='flex flex-row justify-between w-full'>
              <Dialog.Title className='Description-lg font-medium leading-6 text-textWhite text-2xl'>
                Remove wallet
              </Dialog.Title>
              <button onClick={onClose}>
                <Icon type={'Close'} size={'lg'} color={'white'} />
              </button>
            </div>
            <Dialog.Description className='mt-6'>
              <div className='rounded-2xl p-4 bg-bgDarkLight'>
                {/* Description */}
                {body}
                {/* Description */}
              </div>
            </Dialog.Description>
            <div className='flex flex-row justify-around items-center mt-6'>
              {/* Button */}
              {buttons}
              {/* Button */}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}

export default Modal
