import { useState } from 'react'

import AddOwnerModal from './AddOwnerModal'

export default {
  title: 'Components/Organisms/AddOwnerModal',
  component: AddOwnerModal,
}

export const Default = (): React.ReactElement => {
  const [isOpenAddOwnerModal, setIsOpenAddOwnerModal] = useState(true)
  const handleAddOwnerModal = () => {
    setIsOpenAddOwnerModal(!isOpenAddOwnerModal)
  }

  return (
    <AddOwnerModal isOpen={isOpenAddOwnerModal} onClose={handleAddOwnerModal} />
  )
}
