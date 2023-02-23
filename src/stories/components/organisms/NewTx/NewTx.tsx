import React, { useState } from 'react'

import { SidebarIconText } from '../../molecules/IconText/SidebarIconText'

import NewTxModal from './NewTxModal'

const NewTx = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div>
      <>
        <button
          className='bg-bgDarkLight hover:bg-dark'
          onClick={() => setIsOpen(!isOpen)}
        >
          <SidebarIconText type={'NewTx'} text={'NewTx'} />
        </button>
        <NewTxModal isOpen={isOpen} onClose={onClose} />
      </>
    </div>
  )
}

export default NewTx
