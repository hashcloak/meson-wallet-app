import { useState } from 'react'
import ReplaceOwnerModal from '.'
import { mockOwners } from '@/utils/Mock'

export default {
  title: 'Components/Organisms/ReplaceOwnerModal',
  component: ReplaceOwnerModal,
}

export const Default = (): React.ReactElement => {
  const [isOpenReplaceOwnerModal, setIsOpenReplaceOwnerModal] = useState(true)
  const handleReplaceOwnerModal = () => {
    setIsOpenReplaceOwnerModal(!isOpenReplaceOwnerModal)
  }

  return (
    <ReplaceOwnerModal
      isOpen={isOpenReplaceOwnerModal}
      onClose={handleReplaceOwnerModal}
      name={mockOwners[0].address}
      address={mockOwners[0].address}
    />
  )
}
