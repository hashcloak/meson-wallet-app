import React from 'react';

import { theme } from '~/utils/theme';

const sizes = theme.icons.sizes;
const colors = theme.icons.colors;

type Props = {
  iconSize: keyof typeof sizes;
  color: keyof typeof colors;
};

const Transactions: React.FC<Props> = ({ iconSize, color }) => {
  const px = sizes[iconSize];
  const fill = colors[color];

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      enableBackground='new 0 0 24 24'
      viewBox='0 0 24 24'
      fill={fill}
      width={px}
      height={px}
      className="fill-textGray dark:fill-bgWhite group-hover:fill-bgWhite group-active:fill-bgWhite"
    >
      <g>
        <rect fill='none' height='24' width='24' x='0' />
      </g>
      <g>
        <g>
          <polygon points='7.41,13.41 6,12 2,16 6,20 7.41,18.59 5.83,17 21,17 21,15 5.83,15' />
          <polygon points='16.59,10.59 18,12 22,8 18,4 16.59,5.41 18.17,7 3,7 3,9 18.17,9' />
        </g>
      </g>
    </svg>
  );
};

export default Transactions;
