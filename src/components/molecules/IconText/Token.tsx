import React from 'react';
import { Logo } from '~/components/atoms/Icon';

export const tokens = ['EthLogo', 'DaiLogo', 'UsdcLogo', 'BnbLogo'] as const;
export type TokenTypes = (typeof tokens)[number];

type Props = {
  type: TokenTypes;
  abbrev: string;
  token: string;
};

const Token: React.FC<Props> = ({ type, abbrev, token }) => {
  return (
    <div className='flex flex-row items-center'>
      <Logo type={type} size={'xl'} />
      <div className='flex flex-col ml-2'>
        <span className='text-base font-bold'>{abbrev}</span>
        <span className='text-xs'>{token}</span>
      </div>
    </div>
  );
};

export default Token;
