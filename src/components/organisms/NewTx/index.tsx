import React, { useState } from 'react'

import NewTxModal from './NewTxModal'
import ReceiveFundsModal from './ReceiveFundsModal'
import SendFundsModal from './SendFundsModal'
import { SidebarIconText } from '@/components/molecules/IconText'

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
      <div
        className='bg-main hover:bg-dark rounded-2xl'
        onClick={() => setIsOpen(!isOpen)}
        role='button'
        tabIndex={0}
      >
        <SidebarIconText type={'NewTx'} text={'NewTx'} />
      </div>
      <NewTxModal
        isOpen={isOpen}
        onCloseNewTxModal={onCloseNewTxModal}
        isOpenReceiveFundsModal={isOpenReceiveFundsModal}
        handleReceiveFundsModal={handleReceiveFundsModal}
        isOpenSendFundsModal={isOpenSendFundsModal}
        handleSendFundsModal={handleSendFundsModal}
      />
      <ReceiveFundsModal isOpen={isOpenReceiveFundsModal} onClose={handleReceiveFundsModal} />
      <SendFundsModal isOpen={isOpenSendFundsModal} onClose={handleSendFundsModal} />
    </>
  )
}

export default NewTx
