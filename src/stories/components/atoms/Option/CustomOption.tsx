import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

export type Options = {
  value: string | number
  label: string | number
  bg?: string
}

type Props = {
  options: Options[]
  registeredName: string
}

const CustomOption: React.FC<Props> = ({ options, registeredName }) => {
  const [currentVal, setCurrentVal] = useState<string>(
    options[0].label as string
  )
  const [currentBg, setCurrentBg] = useState<string>('bg-bgGray')

  useEffect(() => {
    const defaultBg =
      'bg-gradient-to-r from-[#CFC3FA] to-[#A5FCF4] text-textBlack'
    const selectedOption = options.find((option) => option.value === currentVal)
    setCurrentBg(
      selectedOption?.bg !== undefined ? selectedOption?.bg : defaultBg
    )
  }, [currentVal])

  const { register } = useFormContext()

  return (
    <div className='flex justify-center w-full'>
      <div className='max-w-96 w-full'>
        <select
          className={`text-textBlack form-select appearance-none block w-full h-6 px-6 text-sm text-center border-borderGray rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${currentBg}`}
          {...register(registeredName)}
          onChange={(e) => setCurrentVal(e.target.value)}
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

export default CustomOption
