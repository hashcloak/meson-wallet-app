import { ErrorMessage } from '@hookform/error-message'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { InputProps } from './BasicInput'

const UnitInput: React.FC<InputProps> = ({
  registeredName,
  label,
  placeholder,
  type,
  unit,
  description,
}) => {
  const [input, setInput] = useState<number>(0)

  const {
    register,
    formState: { errors },
  } = useFormContext()
  const { name } = register(registeredName)

  return (
    <>
      <label className='text-textGray text-sm'>{label}</label>
      <div className='block'>
        <input
          {...register(registeredName, {
            valueAsNumber: true,
          })}
          name={name}
          placeholder={placeholder}
          type={type}
          className='border border-borderGray rounded-btn text-base bg-bgWhite rounded-sm px-4 py-2 text-textBlack w-full'
        />
        <span className='ml-[-4rem] text-textBlack'>{unit}</span>
      </div>

      <div className='text-sm text-textBlack'>{description}</div>
      <ErrorMessage
        errors={errors}
        name={registeredName}
        render={({ message }) => (
          <p className='text-warning text-sm'>{message}</p>
        )}
      />
    </>
  )
}

export { UnitInput }
