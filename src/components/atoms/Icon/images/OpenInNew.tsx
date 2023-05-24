import React from 'react';

import { theme } from '~/utils/theme';

const sizes = theme.icons.sizes;
const colors = theme.icons.colors;

type Props = {
  iconSize: keyof typeof sizes;
  color: keyof typeof colors;
};

const OpenInNew: React.FC<Props> = ({ iconSize, color }) => {
  const px = sizes[iconSize];
  const fill = colors[color];

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill={fill}
      width={px}
      height={px}
      className='object-contain'
    >
      <path d='M0 0h24v24H0z' fill='none' />
      <path d='M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z' />
    </svg>
  );
};

export default OpenInNew;
