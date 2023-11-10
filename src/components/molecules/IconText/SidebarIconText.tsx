import React from 'react';
import { SidebarIcon } from '~/components/atoms/Icon';
import { SidebarIconTypes } from '~/components/atoms/Icon/SidebarIcon';

type Props = {
  type: SidebarIconTypes;
  text: string;
};
// TODO: Make it routes to each page
const SidebarIconText: React.FC<Props> = ({ type, text }) => {
  const newTxStyle = type === 'NewTx' ? '' : '';

  return (
    <>
      {type === 'NewTx' ? (
        <span className='flex flex-col items-center justify-center w-20 h-16 max-w-[5rem] max-h-16'>
          <SidebarIcon type={type} size={'lg'} color={'white'} />
          <span className='text-xs text-textWhite font-bold mt-2'>{text}</span>
        </span>
      ) : (
        <div
          className={`flex flex-col items-center justify-center w-20 h-16 max-w-[5rem] max-h-16 rounded-2xl hover:bg-dark active:bg-dark ${newTxStyle}`}
          role='button'
          tabIndex={0}
        >
          <SidebarIcon type={type} size={'lg'} color={'white'} />
          <span className='text-xs text-textWhite mt-2'>{text}</span>
        </div>
      )}
    </>
  );
};

export default SidebarIconText;
