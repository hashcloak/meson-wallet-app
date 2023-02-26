import React, { useState } from 'react'

import { SidebarIconText } from '../../molecules/IconText/SidebarIconText'

import NewTxModal from './NewTxModal'
import ReceiveFundsModal from './ReceiveFundsModal'

const NewTx = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenReceiveFundsModal, setIsOpenReceiveFundsModal] = useState(false)

  const onCloseNewTxModal = () => {
    console.log('change', isOpen)
  }
  const handleReceiveFundsModal = () => {
    setIsOpenReceiveFundsModal(!isOpenReceiveFundsModal)
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
        isOpenReceiveFundsModal={isOpenReceiveFundsModal}
        handleReceiveFundsModal={handleReceiveFundsModal}
      />
      <ReceiveFundsModal
        isOpen={isOpenReceiveFundsModal}
        onClose={handleReceiveFundsModal}
      />
    </>
  )
}

export default NewTx
