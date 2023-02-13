import React, { useEffect, useState } from 'react'

type Props = {
  options: {
    value: string
    label: string
    bg: string
  }[]
}

const Option: React.FC<Props> = ({ options }) => {
  const [currentVal, setCurrentVal] = useState<string>('')
  const [currentBg, setCurrentBg] = useState<string>('')

  useEffect(() => {
    const defaultBg =
      'bg-gradient-to-r from-[#CFC3FA] to-[#A5FCF4] text-textBlack'
    const selectedOption = options.find((option) => option.value === currentVal)
    setCurrentBg(
      selectedOption?.bg !== undefined ? selectedOption?.bg : defaultBg
    )
  }, [currentVal])

  return (
    <div className='flex justify-center w-full'>
      <div className='max-w-96 w-full'>
        <select
          className={`form-select
          appearance-none
          block
          w-full
          h-6
          px-6
          text-sm
          text-center
          border-borderGray
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700
          focus:bg-white
          focus:border-blue-600
          focus:outline-none
          ${currentBg}
          `}
          aria-label='Default select example'
          name='gender'
          onChange={(e) => setCurrentVal(e.target.value)}
          defaultValue={currentVal}
        >
          {options &&
            options.map((option, key) => (
              <option value={option.value} key={key}>
                {option.label}
              </option>
            ))}
        </select>
      </div>
    </div>
  )
}

export default Option
