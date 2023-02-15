import { useState } from 'react'

import Button from '../atoms/Button/Button'

import Modal from './Modal'
import TxModal from './TxModal'

import { DisplayBox } from '~/utils/DisplayBox'

export default {
  title: 'Components/Modals',
  component: { Modal, TxModal },
}

export const Modals = () => {
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
    <div className='flex flex-row w-screen flex-wrap'>
      <DisplayBox title={'Modal'}>
        <Button
          btnVariant={'text'}
          btnSize={'md'}
          btnType={'button'}
          handleClick={onClose}
        >
          Modal
        </Button>
        <div className='flex flex-row flex-wrap w-full'>
          <Modal
            isOpen={isOpen}
            body={body}
            buttons={buttons}
            onClose={onClose}
          />
        </div>
      </DisplayBox>
    </div>
  )
}

export const TxModals = () => {
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
    <div className='flex flex-row w-screen flex-wrap'>
      <DisplayBox title={'Modal'}>
        <Button
          btnVariant={'text'}
          btnSize={'md'}
          btnType={'button'}
          handleClick={onClose}
        >
          Modal
        </Button>
        <div className='flex flex-row flex-wrap w-full'>
          <TxModal isOpen={isOpen} onClose={onClose} />
        </div>
      </DisplayBox>
    </div>
  )
}
