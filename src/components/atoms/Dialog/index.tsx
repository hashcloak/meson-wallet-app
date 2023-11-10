import { Popover } from '@headlessui/react';

type Props = {
  popupBtn: React.ReactNode | JSX.Element;
  popupContent: React.ReactNode;
  border?: boolean;
};

const Dialog: React.FC<Props> = ({ popupBtn, popupContent }) => {
  return (
    <div className='flex flex-row justify-center bg-bgDarkLight h-[3.5rem] border-l-2 border-borderGray'>
      <Popover className='px-4 box-border relative flex items-center'>
        <Popover.Button>{popupBtn}</Popover.Button>
        <Popover.Panel className='absolute top-full left-0 right-0 z-40'>
          {popupContent}
        </Popover.Panel>
      </Popover>
    </div>
  );
};

export default Dialog;
