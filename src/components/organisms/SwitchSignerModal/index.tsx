import { Dialog } from '@headlessui/react'
import { useState } from 'react'

import AddOwnerDetails from './SwitchSignerDetails'
import AddOwnerInput from './SwitchSignerInput'
import SwitchSignerInput from './SwitchSignerInput'

export type NewOwnerType = {
  newOwnerAddress: string
  newOwnerName: string
  confirmation?: string
}

const SwitchSignerModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [pageChange, setPageChange] = useState(false)
  const [newOwner, setNewOwner] = useState<NewOwnerType | null>(null)

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
              <span className='text-textWhite text-2xl font-bold'>Switch signer</span>

              <Dialog.Description className='py-6'>
                {/* Description */}

                <SwitchSignerInput onClose={onClose} />

                {/* Description */}
              </Dialog.Description>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </>
  )
}

export default SwitchSignerModal
