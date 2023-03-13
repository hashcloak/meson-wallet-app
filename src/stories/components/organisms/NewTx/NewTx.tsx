import React, { useState } from 'react'

import { SidebarIconText } from '../../molecules/IconText/SidebarIconText'

import NewTxModal from './NewTxModal'
import ReceiveFundsModal from './ReceiveFundsModal'
import SendFundsModal from './SendFundsModal'

const NewTx = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenReceiveFundsModal, setIsOpenReceiveFundsModal] = useState(false)
  const [isOpenSendFundsModal, setIsOpenSendFundsModal] = useState(false)

  const onCloseNewTxModal = () => {
    setIsOpen(!isOpen)
  }
  const handleReceiveFundsModal = () => {
    setIsOpenReceiveFundsModal(!isOpenReceiveFundsModal)
  }
  const handleSendFundsModal = () => {
    setIsOpenSendFundsModal(!isOpenSendFundsModal)
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
        isOpenSendFundsModal={isOpenSendFundsModal}
        handleSendFundsModal={handleSendFundsModal}
      />
      <ReceiveFundsModal
        isOpen={isOpenReceiveFundsModal}
        onClose={handleReceiveFundsModal}
      />
      <SendFundsModal
        isOpen={isOpenSendFundsModal}
        onClose={handleSendFundsModal}
      />
    </>
  )
}

export default NewTx
