/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorState, resetError } from '~/features/error';
import { RootState } from '~/features/reducers';
import { ToastState, resetToast } from '~/features/toast';

const Alert: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const { error, isError } = useSelector<RootState, ErrorState>(
    (state) => state.error
  );
  const { message, hasMessage } = useSelector<RootState, ToastState>(
    (state) => state.toast
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError && error !== null) {
      setIsOpen(true);
      setIsAnimated(true);
      setTimeout(() => {
        setIsAnimated(false);
        reset();
      }, 10000);
    }
  }, [error]);

  useEffect(() => {
    if (hasMessage && message !== null) {
      setIsOpen(true);
      setIsAnimated(true);
      setTimeout(() => {
        setIsAnimated(false);
        reset();
      }, 10000);
    }
  }, [message]);

  const reset = () => {
    setTimeout(() => {
      dispatch(resetError());
      dispatch(resetToast());
      setIsOpen(false);
    }, 11000);
  };

  return (
    <div
      className={`alert border-solid border-2 bg-bgWhite py-6 px-8 max-w-sm rounded-2xl absolute bottom-4 right-4 ${
        !isError ? 'border-main' : 'border-light'
      }
      ${isOpen ? 'block' : 'hidden'}
      ${isAnimated ? 'animate-slide-in-right' : 'animate-slide-out-right'}
      `}
    >
      <div className='flex flex-col items-start p-0 m-0 '>
        <div className='flex flex-row justify-between w-full'>
          {!isError && !error !== null ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='#38C6F4'
              className='w-6 h-6 object-contain mt-1'
            >
              <path d='M0 0h24v24H0V0z' fill='none' />
              <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z' />
            </svg>
          ) : (
            <div className='flex flex-row items-end gap-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                className='w-6 h-6 object-contain mt-1'
                fill='#FF9169'
              >
                <path d='M0 0h24v24H0V0z' fill='none' />
                <path d='M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' />
              </svg>
              <span className='text-textGray font-bold'>Error</span>
            </div>
          )}
          <button
            onClick={() => {
              setIsAnimated(false);
              reset();
            }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='#606060'
              className='w-5 h-5 object-contain mt-1'
            >
              <path d='M0 0h24v24H0z' fill='none' />
              <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' />
            </svg>
          </button>
        </div>
        <p className='text-sm text-textGray mt-0 pt-0 w-full'>
          {error ? (
            <>
              {String(error).length > 200
                ? String(error).slice(0, 200 - 1) + ' ...'
                : String(error)}
            </>
          ) : (
            <>
              {String(message).length > 200
                ? String(message).slice(0, 200 - 1) + ' ...'
                : String(message)}
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Alert;
