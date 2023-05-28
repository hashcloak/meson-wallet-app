import React from 'react';

import { theme } from '~/utils/theme';

const sizes = theme.icons.sizes;

type Props = {
  iconSize: keyof typeof sizes;
  interact: boolean;
};

const LedgerLogo: React.FC<Props> = ({ iconSize, interact }) => {
  const px = sizes[iconSize];
  const hover = interact
    ? 'box-border fill-[#000] group-hover:fill-[#fff]'
    : 'fill-[#fff]';

  return (
    <svg
      width={px}
      className='object-contain'
      viewBox='0 0 147 128'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M0 91.6548V128H55.293V119.94H8.05631V91.6548H0ZM138.944 91.6548V119.94H91.707V127.998H147V91.6548H138.944ZM55.3733 36.3452V91.6529H91.707V84.3842H63.4296V36.3452H55.3733ZM0 0V36.3452H8.05631V8.05844H55.293V0H0ZM91.707 0V8.05844H138.944V36.3452H147V0H91.707Z'
        fill='black'
        className={hover}
      />
    </svg>
  );
};

export default LedgerLogo;
