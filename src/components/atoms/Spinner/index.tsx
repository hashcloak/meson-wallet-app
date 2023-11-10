import type { FC } from 'react';
type Props = {
  size?: 'sm' | 'md' | 'lg';
};
const Spinner: FC<Props> = ({ size = 'md' }) => {
  switch (size) {
    case 'sm':
      return (
        <div className='flex justify-center'>
          <div className='animate-spin h-4 w-4 border-2 border-main rounded-full border-t-transparent'></div>
        </div>
      );
    case 'lg':
      return (
        <div className='flex justify-center'>
          <div className='animate-spin h-12 w-12 border-4 border-main rounded-full border-t-transparent'></div>
        </div>
      );
    case 'md':
      return (
        <div className='flex justify-center'>
          <div className='animate-spin h-10 w-10 border-4 border-main rounded-full border-t-transparent'></div>
        </div>
      );
  }
};

export default Spinner;
