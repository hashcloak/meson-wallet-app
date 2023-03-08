import { Dialog } from '@headlessui/react'
import { useState } from 'react'

import Button from '../../atoms/Button/Button'

import AddOwnerModal from './AddOwnerModal'
import ChangeThresholdModal from './ChangeThresholdModal'
import OwnerRow from './OwnerRow'

import Spacer from '~/utils/Spacer'

export type OwnerType = {
  address: string
  name: string
}

type Props = {
  isOpen: boolean | undefined
  owners: OwnerType[]
  onClose: () => void
}

const EditOwnersDetails: React.FC<{
  owners: OwnerType[]
  onClose: () => void
}> = ({ owners, onClose }) => {
  const [isOpenChangeThresholdModal, setIsOpenChangeThresholdModal] =
    useState(false)
  const [isOpenAddOwnerModal, setIsOpenAddOwnerModal] = useState(false)

  const handleChangeThresholdModal = () => {
    setIsOpenChangeThresholdModal(!isOpenChangeThresholdModal)
  }
  const handleAddOwnerModal = () => {
    setIsOpenAddOwnerModal(!isOpenAddOwnerModal)
  }
  return (
    <>
      <div className='flex flex-col justify-center items-center text-textWhite'>
        <div>
          <span className='text-left'>Owners</span>
          <div className='rounded-2xl bg-bgDarkLight p-4'>
            {owners.map((owner: OwnerType) => (
              <OwnerRow owner={owner} key={owner.address} />
            ))}
          </div>
          <Spacer size={32} axis={'vertical'} />

          <div className='flex flex-row justify-around'>
            <Button
              btnVariant={'text'}
              btnSize={'md'}
              btnType={'button'}
              handleClick={onClose}
            >
              <span className='text-lg'>Close</span>
            </Button>
            <Button
              btnVariant={'border'}
              btnSize={'md'}
              btnType={'submit'}
              // handleClick={onClose}
              handleClick={handleChangeThresholdModal}
            >
              Change threshold
            </Button>
            <Button
              btnVariant={'primary'}
              btnSize={'md'}
              btnType={'submit'}
              // handleClick={onClose}
              handleClick={handleAddOwnerModal}
            >
              Add new owner
            </Button>
          </div>
          <ChangeThresholdModal
            isOpen={isOpenChangeThresholdModal}
            onClose={handleChangeThresholdModal}
          />
          <AddOwnerModal
            isOpen={isOpenAddOwnerModal}
            onClose={handleAddOwnerModal}
          />
        </div>
      </div>
    </>
  )
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
              <span className='text-textWhite text-2xl font-bold'>
                Edit owners
              </span>

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
