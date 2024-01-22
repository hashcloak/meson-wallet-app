import React from 'react';

import { theme } from '~/utils/theme';

const sizes = theme.icons.sizes;
const colors = theme.icons.colors;

type Props = {
  iconSize: keyof typeof sizes;
  color: keyof typeof colors;
};

const ChevronRight: React.FC<Props> = ({ iconSize, color }) => {
  const px = sizes[iconSize];
  const fill = colors[color];

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill={fill}
      width={px}
      height={px}
      className='object-contain dark:fill-bgGray fill-bgGray'
    >
      <path d='M0 0h24v24H0z' fill='none' />
      <path d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z' />
    </svg>
  );
};

export default ChevronRight;
