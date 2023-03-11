import { useState } from 'react'

import Button from '../../atoms/Button/Button'
import AddOwnerModal from '../AddOwnerModal/AddOwnerModal'
import ChangeThresholdModal from '../ChangeThresholdModal/ChangeThresholdModal'
import OwnerRow from '../EditOwners/OwnerRow'

import { OwnerType } from './EditOwners'

import Spacer from '~/utils/Spacer'

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

export default EditOwnersDetails
