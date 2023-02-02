import { Dialog } from '@headlessui/react'

import Spacer from '~/utils/Spacer'

type Props = {
  isLoading: boolean
  body?: React.ReactElement
}

const Loader: React.FC<Props> = ({ isLoading }) => {
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
                <img
                  src='../../../../public/Meson_loader.png'
                  alt='meson_loader'
                  className='object-contain w-40'
                />
                <Spacer size={16} axis={'vertical'} />
                <div className='flex flex-col items-center'>
                  <span className='text-2xl	text-textWhite font-bold'>
                    Deploying
                  </span>
                  <Spacer size={8} axis={'vertical'} />
                  <span className='text-base text-textWhite'>
                    Please wait while we get everything ready for you!
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

export default Loader
