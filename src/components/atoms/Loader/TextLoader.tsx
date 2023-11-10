import React from 'react';

const TextLoader: React.FC = () => {
  return (
    <div className='text-loader'>
      <div className='ml-[4px] h-full w-1 inline-block rect1'></div>
      <div className='ml-[4px] h-full w-1 inline-block rect2'></div>
      <div className='ml-[4px] h-full w-1 inline-block rect3'></div>
      <div className='ml-[4px] h-full w-1 inline-block rect4'></div>
      <div className='ml-[4px] mr-[4px] h-full w-1 inline-block rect5'></div>
    </div>
  );
};

export default TextLoader;
