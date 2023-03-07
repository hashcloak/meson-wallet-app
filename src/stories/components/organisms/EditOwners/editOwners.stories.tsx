import { useState } from 'react'

import { mockOwners } from '../../template/SettingsContents/WalletSettings'

import EditOwners from './EditOwners'

export default {
  title: 'Components/Organisms/EditOwners',
  component: EditOwners,
}

export const Default = (): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <EditOwners
      isOpen={isOpen}
      onClose={function (): void {
        setIsOpen(!isOpen)
      }}
      owners={mockOwners}
    />
  )
}
