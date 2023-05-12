import { useState } from 'react'
import SwitchSignerModal from '.'

export default {
  title: 'Components/Organisms/SwitchSigner',
  component: SwitchSignerModal,
}

export const Default = (): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(true)
  const handleIsOpen = () => {
    setIsOpen(!isOpen)
  }

  return <SwitchSignerModal isOpen={isOpen} onClose={handleIsOpen} />
}
