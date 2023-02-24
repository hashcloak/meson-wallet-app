import React, { useState } from 'react'

import { SidebarIconText } from '../../molecules/IconText/SidebarIconText'

import NewTxModal from './NewTxModal'
import ReceiveTxModal from './ReceiveTxModal'

const NewTx = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenReceiveTxModal, setIsOpenReceiveTxModal] = useState(false)

  const onCloseNewTxModal = () => {
    setIsOpen(!isOpen)
    console.log('change', isOpen)
  }
  const handleReceiveTxModal = () => {
    setIsOpenReceiveTxModal(!isOpenReceiveTxModal)
    console.log('setIsOpenReceiveTxModal', isOpenReceiveTxModal)
  }
  return (
    <>
      <button
        className='bg-bgDarkLight hover:bg-dark'
        onClick={() => setIsOpen(!isOpen)}
      >
        <SidebarIconText type={'NewTx'} text={'NewTx'} />
      </button>
      <NewTxModal
        isOpen={isOpen}
        onCloseNewTxModal={onCloseNewTxModal}
        isOpenReceiveTxModal={isOpenReceiveTxModal}
        handleReceiveTxModal={handleReceiveTxModal}
      />
      <ReceiveTxModal
        isOpen={isOpenReceiveTxModal}
        onClose={handleReceiveTxModal}
      />
    </>
  )
}

export default NewTx
