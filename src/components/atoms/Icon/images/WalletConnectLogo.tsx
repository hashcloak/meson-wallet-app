import React from 'react';

import { theme } from '~/utils/theme';

const sizes = theme.icons.sizes;

type Props = {
  iconSize: keyof typeof sizes;
  interact: boolean;
};

const WalletConnectLogo: React.FC<Props> = ({ iconSize, interact }) => {
  const px = sizes[iconSize];
  const hover = interact
    ? 'box-border fill-[#3396ff] group-hover:fill-[#fff]'
    : 'fill-bgWhite';

  return (
    <>
      <svg
        fill='none'
        width={px}
        viewBox='0 0 480 332'
        xmlns='http://www.w3.org/2000/svg'
        className='object-contain'
      >
        <path
          d='m126.613 93.9842c62.622-61.3123 164.152-61.3123 226.775 0l7.536 7.3788c3.131 3.066 3.131 8.036 0 11.102l-25.781 25.242c-1.566 1.533-4.104 1.533-5.67 0l-10.371-10.154c-43.687-42.7734-114.517-42.7734-158.204 0l-11.107 10.874c-1.565 1.533-4.103 1.533-5.669 0l-25.781-25.242c-3.132-3.066-3.132-8.036 0-11.102zm280.093 52.2038 22.946 22.465c3.131 3.066 3.131 8.036 0 11.102l-103.463 101.301c-3.131 3.065-8.208 3.065-11.339 0l-73.432-71.896c-.783-.767-2.052-.767-2.835 0l-73.43 71.896c-3.131 3.065-8.208 3.065-11.339 0l-103.4657-101.302c-3.1311-3.066-3.1311-8.036 0-11.102l22.9456-22.466c3.1311-3.065 8.2077-3.065 11.3388 0l73.4333 71.897c.782.767 2.051.767 2.834 0l73.429-71.897c3.131-3.065 8.208-3.065 11.339 0l73.433 71.897c.783.767 2.052.767 2.835 0l73.431-71.895c3.132-3.066 8.208-3.066 11.339 0z'
          className={hover}
        />
      </svg>
    </>
  );
};

export default WalletConnectLogo;
