import React from 'react'

import { SidebarIcon, SidebarIconTypes } from '../../atoms/Icon/SidebarIcon'

type Props = {
  type: SidebarIconTypes
  text: string
}
//TODO: Make it routes to each page
export const SidebarIconText: React.FC<Props> = ({ type, text }) => {
  const newTxStyle = type === 'NewTx' ? 'bg-main' : ''
  return (
    <button
      className={`flex flex-col items-center justify-center w-20 h-16 max-w-[5rem] max-h-16 rounded-2xl hover:bg-dark ${newTxStyle}`}
      type='button'
    >
      <SidebarIcon type={type} size={'lg'} color={'white'} />
      <span className='text-xs text-textWhite mt-2'>{text}</span>
    </button>
  )
}
