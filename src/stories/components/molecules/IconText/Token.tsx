import React from 'react'

import { Logo, LogoTypes } from '../../atoms/Icon/Logo'

type Props = {
  type: LogoTypes
  abbrev: string
  token: string
}

export const Token: React.FC<Props> = ({ type, abbrev, token }) => {
  return (
    <div className='flex flex-row items-center'>
      <Logo type={type} size={'xl'} />
      <div className='flex flex-col ml-2'>
        <span className='text-base font-bold'>{abbrev}</span>
        <span className='text-xs'>{token}</span>
      </div>
    </div>
  )
}
