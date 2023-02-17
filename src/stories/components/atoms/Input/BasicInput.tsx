import { ErrorMessage } from '@hookform/error-message'
import { ChangeEvent } from 'react'
import { useFormContext } from 'react-hook-form'

export type InputProps = {
  registeredName: string
  label: string
  placeholder?: string
  type: string
  unit?: string
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void
  children?: React.ReactElement
}

const BasicInput: React.FC<InputProps> = ({
  registeredName,
  label,
  placeholder,
  type,
  handleChange,
  children,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const { name } = register(registeredName)

  return (
    <>
      <label className='text-textGrayLight text-sm'>{label}</label>
      <input
        {...register(registeredName)}
        name={name}
        placeholder={placeholder}
        type={type}
        className='border border-borderGray text-base bg-bgWhite rounded-md px-4 py-2 text-textBlack w-full'
        onChange={
          handleChange && handleChange
            ? (e: ChangeEvent<HTMLInputElement>) => handleChange(e)
            : undefined
        }
      />
      <div className='text-sm text-textBlack'>{children}</div>
      <ErrorMessage
        errors={errors}
        name={registeredName}
        render={({ message }) => (
          <p className='text-alert text-sm'>{message}</p>
        )}
      />
    </>
  )
}

export { BasicInput }
