import { useState } from 'react'
import EditOwners from '.'
import { mockOwners } from '@/utils/Mock'

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
