/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect, useState } from 'react';
import { Popover } from '@headlessui/react';

type Props = {
  popupBtn: React.ReactNode | JSX.Element;
  popupContent: React.ReactNode;
  border?: boolean;
};

const Dialog: React.FC<Props> = ({ popupBtn, popupContent }) => {
const [isOpenDialog, setIsOpenDialog] = useState(false)

useEffect(() => {
  setIsOpenDialog(false)
}, [popupContent])

  return (
    <div className='flex flex-row justify-center bg-bgDarkLight h-[3.5rem] border-l-2 border-borderGray'>
      <Popover className='px-4 box-border relative flex items-center'>
        <Popover.Button onClick={()=>setIsOpenDialog(!isOpenDialog)}>{popupBtn}</Popover.Button>
        {isOpenDialog && (
          <>
            <div className="fixed inset-0 opacity-0" onClick={()=>setIsOpenDialog(false)} />
            <div className='absolute top-full left-[-46px] right-0 z-10'>
            {popupContent}
            </div>
          </>
        )}
      </Popover>
    </div>
  );
};

export default Dialog;
