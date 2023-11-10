import React from 'react';
import Spacer from '~/utils/Spacer';
import { Icon, IconColors, IconTypes } from '../../atoms/Icon/Icon';

type Props = {
  iconType: IconTypes;
  iconColor: IconColors;
  children: React.ReactNode;
};

const IconText: React.FC<Props> = ({ iconType, iconColor, children }) => {
  return (
    <div className='flex flex-row justify-center items-center'>
      <span className='text-textWhite text-2xl font-bold'>{children}</span>
      <Spacer size={16} axis={'horizontal'} />
      <Icon type={iconType} size={'xl'} color={iconColor} />
    </div>
  );
};

export default IconText;
