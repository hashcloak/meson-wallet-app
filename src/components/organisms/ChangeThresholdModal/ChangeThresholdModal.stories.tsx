import { useState } from 'react'
import ChangeThresholdModal from '.'

export default {
  title: 'Components/Organisms/ChangeThresholdModal',
  component: ChangeThresholdModal,
}

export const Default = (): React.ReactElement => {
  const [isOpenChangeThresholdModal, setIsOpenChangeThresholdModal] = useState(true)
  const handleChangeThresholdModal = () => {
    setIsOpenChangeThresholdModal(!isOpenChangeThresholdModal)
  }

  return (
    <ChangeThresholdModal
      isOpen={isOpenChangeThresholdModal}
      onClose={handleChangeThresholdModal}
    />
  )
}
