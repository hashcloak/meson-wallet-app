import React from 'react'

import Spacer from '~/utils/Spacer'

type Props = {
  ethAddress: string
}

const EthAddress: React.FC<Props> = ({ ethAddress }) => {
  return (
    <div className='flex flex-row items-center'>
      <span className='text-textWhite text-sm font-normal ml-2'>eth: </span>
      <span className='text-textWhite text-base font-normal'>{ethAddress}</span>
      <div className='flex flex-row ml-4'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          className='fill-textWhite object-contain w-5'
        >
          <path d='M0 0h24v24H0z' fill='none' />
          <path d='M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z' />
        </svg>
        <Spacer size={8} axis={'horizontal'} />
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          className='fill-textWhite object-contain w-5'
        >
          <path d='M0 0h24v24H0z' fill='none' />
          <path d='M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z' />
        </svg>
      </div>
    </div>
  )
}

export default EthAddress
