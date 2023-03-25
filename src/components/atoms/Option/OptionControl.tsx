import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

export type Options = {
  value: string
  label: string
  bg?: string
}

type Props = {
  options: Options[]
  registeredName: string
  size?: null | 'lg'
  handleChange?: (e: any) => void
}

const OptionControl: React.FC<Props> = ({ options, registeredName, size = null, handleChange }) => {
  const [currentVal, setCurrentVal] = useState<string>(
    options.length > 0 ? options[0].label.toString() : '',
  )
  const [currentBg, setCurrentBg] = useState<string>(
    options.length > 0 && options[0].bg ? options[0].bg : 'bg-bgGray',
  )

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

  useEffect(() => {
    const selectedOption = options.find((option) => option.value === currentVal)
    setCurrentBg(selectedOption?.bg !== undefined ? selectedOption?.bg : 'bg-bgGray')
  }, [currentVal])

  const { register } = useFormContext()

  return (
    <div className='flex justify-center w-full'>
      <div className='max-w-96 w-full'>
        <select
          className={`text-textBlack form-select appearance-none block w-full ${optionHeight()} px-6 ${
            size ? 'text-base text-left' : 'text-sm text-center '
          } border-borderGray rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${currentBg}`}
          {...register(registeredName)}
          onChange={(e) => {
            handleChange && handleChange(e)
            setCurrentVal(e.target.value)
          }}
          value={currentVal}
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

export default OptionControl
