import { useState } from 'react'

import RemoveOwnerModal from './RemoveOwnerModal'

import { mockOwners } from '~/stories/utils/Mock'

export default {
  title: 'Components/Organisms/RemoveOwnerModal',
  component: RemoveOwnerModal,
}

export const Default = (): React.ReactElement => {
  const [isOpenRemoveOwnerModal, setIsOpenRemoveOwnerModal] = useState(true)
  const handleRemoveOwnerModal = () => {
    setIsOpenRemoveOwnerModal(!isOpenRemoveOwnerModal)
  }

  return (
    <RemoveOwnerModal
      isOpen={isOpenRemoveOwnerModal}
      onClose={handleRemoveOwnerModal}
      name={mockOwners[0].address}
      address={mockOwners[0].address}
    />
  )
}
