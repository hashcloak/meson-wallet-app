import React from 'react';
import CustomLink from '~/components/atoms/CustomLink';
import Spacer from '~/utils/Spacer';

export const Footer: React.FC = () => {
  return (
    <div className='text-sm'>
      <div className='flex flex-col items-center'>
        <CustomLink url={'http://'} size={'xs'}>
          Terms
        </CustomLink>
        <CustomLink url={'http://'} size={'xs'}>
          Privacy
        </CustomLink>
        <CustomLink url={'http://'} size={'xs'}>
          Licenses
        </CustomLink>
        <CustomLink url={'http://'} size={'xs'}>
          Imprint
        </CustomLink>
        <CustomLink url={'http://'} size={'xs'}>
          Cookie Policy
        </CustomLink>
      </div>
      <Spacer size={8} axis={'vertical'} />
      <span className='text-textWhite text-xs'>© HashCloak</span>
    </div>
  );
};
