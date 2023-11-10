import { useEffect, useState } from 'react';

import Button from '../Button/Button';

import { Loader, LoaderSuccess } from '.';

export default {
  title: 'Components/Atmos/Loaders',
  component: { Loader, LoaderSuccess },
};

export const Default: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onLoading = () => {
    setIsLoading(!isLoading);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsSuccess(!isSuccess);
      setTimeout(() => {
        setIsLoading(!isLoading);
      }, 3000);
    }, 8000);
  }, [isLoading]);

  return (
    <div className='flex flex-row w-screen flex-wrap'>
      <Button
        btnVariant={'text'}
        btnSize={'md'}
        btnType={'button'}
        handleClick={onLoading}
      >
        Submit
      </Button>
      <div className='flex flex-row flex-wrap w-full'>
        <Loader isLoading={isLoading} isSuccess />
      </div>
    </div>
  );
};
