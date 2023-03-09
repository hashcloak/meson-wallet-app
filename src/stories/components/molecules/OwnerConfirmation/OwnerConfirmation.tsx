import React from 'react'

import { Options } from '../../atoms/Option/OptionControl'
import OptionControl from '../../atoms/Option/OptionControl'

type Props = {
  numOfConfirmation: Options[]
}

const OwnerConfirmation: React.FC<Props> = ({ numOfConfirmation }) => {
  return (
    <>
      <span>Any transaction requires the confirmation of:</span>
      <div className='grid grid-cols-4'>
        <div className='col-span-1 mr-2'>
          <OptionControl
            options={numOfConfirmation}
            registeredName={'confirmation'}
          />
        </div>
        <span className='col-span-3'>
          out of {numOfConfirmation.length} owner(s)
        </span>
      </div>
    </>
  )
}

export default OwnerConfirmation
