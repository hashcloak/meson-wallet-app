import React from 'react'

import CustomLink from '../../atoms/Link/CustomLink'

import Spacer from '~/utils/Spacer'

export const Footer: React.FC = () => {
  return (
    <div className='text-sm'>
      <div className='flex flex-col items-center'>
        <CustomLink url={'http://'} size={'xs'} text={'Terms'} />
        <CustomLink url={'http://'} size={'xs'} text={'Privacy'} />
        <CustomLink url={'http://'} size={'xs'} text={'Licenses'} />
        <CustomLink url={'http://'} size={'xs'} text={'Imprint'} />
        <CustomLink url={'http://'} size={'xs'} text={'Cookie Policy'} />
      </div>
      <Spacer size={8} axis={'vertical'} />
      <span className='text-textWhite text-xs'>© HashCloak</span>
    </div>
  )
}
