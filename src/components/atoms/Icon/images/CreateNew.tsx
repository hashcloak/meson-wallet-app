import React from 'react';

import { theme } from '~/utils/theme';

const sizes = theme.icons.sizes;
const colors = theme.icons.colors;

type Props = {
  iconSize: keyof typeof sizes;
  color: keyof typeof colors;
};

const CreateNew: React.FC<Props> = ({ iconSize, color }) => {
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
      <rect fill='none' height='24' width='24' x='0' y='0' />
      <path d='M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10s10-4.48,10-10C22,6.48,17.52,2,12,2z M13.88,11.54l-4.96,4.96l-1.41-1.41 l4.96-4.96L10.34,8l5.65,0.01L16,13.66L13.88,11.54z' />
    </svg>
  );
};

export default CreateNew;
