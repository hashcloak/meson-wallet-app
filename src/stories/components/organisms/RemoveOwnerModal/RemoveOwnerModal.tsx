import { Dialog } from '@headlessui/react'
import { useState } from 'react'

import { EditOwnerModalType as RemoveOwnerModalType } from '../EditOwnerModal/EditOwnerModal'

import RemoveOwnerDetails from './RemoveOwnerDetails'
import RemoveOwnerInput from './RemoveOwnerInput'

const RemoveOwnerModal: React.FC<RemoveOwnerModalType> = ({
  isOpen,
  onClose,
  name,
  address,
}) => {
  const [pageChange, setPageChange] = useState(false)
  const [newConfirmation, onNewConfirmation] = useState<string | null>(null)

  const handlePageChange = () => {
    setPageChange(!pageChange)
  }

  return (
    <>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={onClose}
          className='fixed z-10 inset-0 overflow-y-auto'
          // static
        >
          <div className='flex items-center justify-center min-h-screen'>
            <Dialog.Overlay
              className='fixed inset-0 bg-neutral-900 opacity-30'
              aria-hidden='true'
            />
            <Dialog.Panel className='relative bg-bgDarkMid rounded-2xl py-6 px-8'>
              <span className='text-textWhite text-2xl font-bold'>
                Remove owner{' '}
                {!pageChange ? (
                  <span className='text-sm text-textGrayLight'>(1/2)</span>
                ) : (
                  <span className='text-sm text-textGrayLight'>(2/2)</span>
                )}
              </span>

              <Dialog.Description className='py-6'>
                {/* Description */}

                {!pageChange ? (
                  <RemoveOwnerInput
                    onClose={onClose}
                    name={name}
                    address={address}
                    onPageChange={handlePageChange}
                    onNewConfirmation={onNewConfirmation}
                  />
                ) : (
                  <RemoveOwnerDetails
                    onClose={onClose}
                    confirmation={newConfirmation!}
                    name={name}
                    address={address}
                    onPageChange={handlePageChange}
                  />
                )}
                {/* Description */}
              </Dialog.Description>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </>
  )
}

export default RemoveOwnerModal
