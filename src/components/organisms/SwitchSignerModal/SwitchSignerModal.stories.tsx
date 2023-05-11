import { useState } from 'react'
import SwitchSignerModal from '.'

export default {
  title: 'Components/Organisms/SwitchSigner',
  component: SwitchSignerModal,
}

export const Default = (): React.ReactElement => {
  return <SwitchSignerModal isOpen={true} onClose={() => {}} />
}
