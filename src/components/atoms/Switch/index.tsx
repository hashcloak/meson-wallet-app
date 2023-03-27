import React, { useState } from 'react'

type Props = {
  label: {
    on: string
    off: string
  }
  handleClick: () => void
  defaultStatus?: boolean
}

const Switch: React.FC<Props> = ({ label, handleClick, defaultStatus = true }) => {
  const [enabled, setEnabled] = useState(defaultStatus)

  return (
    <div className='flex flex-row items-center'>
      <div
        className={
          'md:w-14 md:h-7 w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ' +
          (enabled ? 'bg-dark' : 'bg-bgWhite border-solid  border-2 border-bgDark')
        }
        onClick={() => {
          setEnabled(!enabled)
          handleClick()
        }}
      >
        {/* Switch */}
        <div
          className={
            'md:w-6 md:h-6 h-4 w-4 rounded-full shadow-md transform duration-300 ease-in-out ' +
            (enabled ? 'bg-bgWhite' : 'transform translate-x-5 bg-bgDark')
          }
        />
      </div>
      <span className='text-base ml-2 text-textWhite'>{enabled ? label.on : label.off}</span>
    </div>
  )
}

export default Switch
