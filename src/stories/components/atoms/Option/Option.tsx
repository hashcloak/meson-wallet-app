import React, { useEffect, useState } from 'react'

export type Options = {
  value: string | number
  label: string | number | JSX.Element
  bg?: string
}

type Props = {
  options: Options[]
  size?: null | 'lg'
  handleChange?: (value: string) => void
  defaultValue?: string
}

const Option: React.FC<Props> = ({
  options,
  size = null,
  handleChange,
  defaultValue,
}) => {
  const [currentVal, setCurrentVal] = useState<string>('')
  const [currentBg, setCurrentBg] = useState<string>('')

  useEffect(() => {
    const defaultBg =
      'bg-gradient-to-r from-[#CFC3FA] to-[#A5FCF4] text-textBlack appearance-none'
    const selectedOption = options.find((option) => option.value === currentVal)
    setCurrentBg(
      selectedOption?.bg !== undefined ? selectedOption?.bg : defaultBg
    )
  }, [currentVal])

  const optionHeight = () => {
    let height = 'h-6'
    switch (size) {
      case 'lg':
        height = 'h-10'
        break
      default:
        break
    }
    return height
  }

  return (
    <div className='flex justify-center w-full'>
      <div className='max-w-96 w-full'>
        <select
          className={`form-select
          block
          w-full
          ${optionHeight()}
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
          onChange={(e) => {
            setCurrentVal(e.target.value)
            handleChange && handleChange(e.target.value)
          }}
          defaultValue={defaultValue || currentVal}
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
