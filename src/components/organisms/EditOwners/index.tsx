import { Dialog } from '@headlessui/react'
import EditOwnersDetails from './EditOwnersDetails'

export type OwnerType = {
  address: string
  name: string
}

type Props = {
  isOpen: boolean | undefined
  owners: OwnerType[]
  onClose: () => void
}

const EditOwners: React.FC<Props> = ({ isOpen, onClose, owners }) => {
  return (
    <>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={onClose}
          className='fixed z-10 inset-0 overflow-y-auto'
          static
        >
          <div className='flex items-center justify-center min-h-screen'>
            <Dialog.Overlay
              className='fixed inset-0 bg-neutral-900 opacity-30'
              aria-hidden='true'
            />
            <Dialog.Panel className='relative bg-bgDarkMid rounded-2xl py-6 px-8 '>
              <span className='text-textWhite text-2xl font-bold'>Edit owners</span>

              <Dialog.Description className='py-6'>
                {/* Description */}
                <EditOwnersDetails owners={owners} onClose={onClose} />
                {/* Description */}
              </Dialog.Description>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </>
  )
}

export default EditOwners
