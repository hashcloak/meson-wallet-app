import React from 'react';

import { theme } from '~/utils/theme';

const sizes = theme.icons.sizes;
const colors = theme.icons.colors;

type Props = {
  iconSize: keyof typeof sizes;
  color: keyof typeof colors;
};

const AccountCreated: React.FC<Props> = ({ iconSize, color }) => {
  const px = sizes[iconSize];

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      width={px}
      height={px}
      className='object-contain'
    >
      <circle cx='12' cy='12' r='12' fill={color} />
      <g clipPath='url(#clip0_601_12742)'>
        <path
          d='M7.25 12.5L4.75 9H3.5V15H4.75V11.5L7.3 15H8.5V9H7.25V12.5ZM9.5 15H13.5V13.75H11V12.64H13.5V11.38H11V10.26H13.5V9H9.5V15ZM19.25 9V13.5H18.13V9.99H16.88V13.51H15.75V9H14.5V14C14.5 14.55 14.95 15 15.5 15H19.5C20.05 15 20.5 14.55 20.5 14V9H19.25Z'
          fill='#1F5B92'
        />
      </g>
      <defs>
        <clipPath id='clip0_601_12742'>
          <rect width='24' height='24' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};

export default AccountCreated;
