import React from 'react';

import { theme } from '~/utils/theme';

const sizes = theme.icons.sizes;
const colors = theme.icons.colors;

type Props = {
  iconSize: keyof typeof sizes;
  color: keyof typeof colors;
};

const ArrowNarrowDown: React.FC<Props> = ({ iconSize, color }) => {
  const px = sizes[iconSize];
  const fill = colors[color];

  return (
    <svg
      viewBox='0 0 81 80'
      xmlns='http://www.w3.org/2000/svg'
      fill={'black'}
      width={px}
      height={px}
      className=" object-contain"
    >
      <path
        d='M53.8334 56.6667L40.5001 70M40.5001 70L27.1667 56.6667M40.5001 70V10'
        className="stroke-textGray dark:stroke-bgWhite"
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default ArrowNarrowDown;
