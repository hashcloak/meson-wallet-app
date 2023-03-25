import { useState } from 'react'
import Alert from '.'

export default {
  title: 'Components/Atmos/Alert',
  component: 'Alert',
}

export const Default = (): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='flex flex-row flex-wrap w-full'>
      <div className='m-4'>
        <Alert
          variant='success'
          message='Your transaction was successfully processed.'
          onClose={onClose}
        />
      </div>
      <div className='m-4'>
        <Alert
          variant='warning'
          message='Please sign the transaction request in your signer wallet.'
          onClose={onClose}
        />
      </div>
    </div>
  )
}
