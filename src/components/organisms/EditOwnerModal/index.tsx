import { Dialog } from '@headlessui/react'
import EditOwnerDetails from './EditOwnerDetails'

export type EditOwnerModalType = {
  isOpen: boolean
  onClose: () => void
  name: string
  address: string
}

const EditOwnerModal: React.FC<EditOwnerModalType> = ({ isOpen, onClose, name, address }) => {
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
              <span className='text-textWhite text-2xl font-bold'>Edit owner</span>

              <Dialog.Description className='py-6'>
                {/* Description */}
                <EditOwnerDetails onClose={onClose} name={name} address={address} />
                {/* Description */}
              </Dialog.Description>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </>
  )
}

export default EditOwnerModal
