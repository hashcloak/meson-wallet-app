import { Dialog } from '@headlessui/react'
import React from 'react'

import Spacer from '~/utils/Spacer'

type Props = {
  isLoading: boolean
  body?: React.ReactElement
}

const LoaderSuccess: React.FC<Props> = ({ isLoading }) => {
  return (
    <>
      <Dialog
        open={isLoading}
        onClose={() => false}
        className='fixed z-10 inset-0 overflow-y-auto'
      >
        <div className='flex items-center justify-center min-h-screen'>
          <Dialog.Overlay
            className='fixed inset-0 bg-neutral-900 opacity-30'
            aria-hidden='true'
          />
          <Dialog.Panel className='relative bg-bgDarkMid rounded-2xl w-[30rem] h-[20rem] mx-auto py-6 px-8'>
            <Dialog.Description>
              <div className='rounded-2xl p-4 flex flex-col items-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='#38C6F4'
                  width='160'
                  height='160'
                  className='object-contain'
                >
                  <path d='M0 0h24v24H0z' fill='none' />
                  <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' />
                </svg>
                <Spacer size={16} axis={'vertical'} />
                <div className='flex flex-col items-center'>
                  <span className='text-2xl	text-textWhite font-bold'>
                    Successfully created!
                  </span>
                  <Spacer size={8} axis={'vertical'} />
                  <span className='text-base text-textWhite'>
                    Redirect to dashboard
                  </span>
                </div>
              </div>
            </Dialog.Description>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}

export default LoaderSuccess
