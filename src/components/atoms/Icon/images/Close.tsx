import React from 'react';

import { theme } from '~/utils/theme';

const sizes = theme.icons.sizes;
const colors = theme.icons.colors;

type Props = {
  iconSize: keyof typeof sizes;
  color: keyof typeof colors;
};

const Close: React.FC<Props> = ({ iconSize, color }) => {
  const px = sizes[iconSize];
  const fill = colors[color];

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill={fill}
      width={px}
      height={px}
    >
      <path d='M0 0h24v24H0z' fill='none' />
      <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' />
    </svg>
  );
};

export default Close;
