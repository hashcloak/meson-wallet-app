import React from 'react'
import { InputControl } from '@/components/atoms/Input'
import Spacer from '@/utils/Spacer'

const NewOwnerInput = () => {
  return (
    <>
      <InputControl
        label='Owner name'
        placeholder='Owner name'
        type='text'
        registeredName={'newOwnerName'}
      />

      <Spacer size={16} axis={'vertical'} />

      <InputControl
        label='Owner address'
        placeholder='0xfF0000000000000000000000000000000000*'
        type='text'
        registeredName={'newOwnerAddress'}
      />
    </>
  )
}

export default NewOwnerInput
