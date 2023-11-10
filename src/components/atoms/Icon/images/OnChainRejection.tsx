import React from 'react';

import { theme } from '~/utils/theme';

const sizes = theme.icons.sizes;
const colors = theme.icons.colors;

type Props = {
  iconSize: keyof typeof sizes;
  color: keyof typeof colors;
};

const OnChainRejection: React.FC<Props> = ({ iconSize, color }) => {
  const px = sizes[iconSize];

  return (
    <svg
      width={px}
      height={px}
      viewBox='0 0 33 33'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='16.5' cy='16.375' r='16' fill={color} />
      <g clipPath='url(#clip0_10856_27728)'>
        <g clipPath='url(#clip1_10856_27728)'>
          <path
            d='M16.5 6.375C11 6.375 6.5 10.875 6.5 16.375C6.5 21.875 11 26.375 16.5 26.375C22 26.375 26.5 21.875 26.5 16.375C26.5 10.875 22 6.375 16.5 6.375ZM8.5 16.375C8.5 11.975 12.1 8.375 16.5 8.375C18.3 8.375 20 8.975 21.4 10.075L10.2 21.275C9.1 19.875 8.5 18.175 8.5 16.375ZM16.5 24.375C14.7 24.375 13 23.775 11.6 22.675L22.8 11.475C23.9 12.875 24.5 14.575 24.5 16.375C24.5 20.775 20.9 24.375 16.5 24.375Z'
            fill='#DC2626'
          />
        </g>
      </g>
      <defs>
        <clipPath id='clip0_10856_27728'>
          <rect
            width='24'
            height='24'
            fill='white'
            transform='translate(4.5 4.375)'
          />
        </clipPath>
        <clipPath id='clip1_10856_27728'>
          <rect
            width='24'
            height='24'
            fill='white'
            transform='translate(4.5 4.375)'
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default OnChainRejection;
