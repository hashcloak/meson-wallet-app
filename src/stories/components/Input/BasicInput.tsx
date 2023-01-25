import { ErrorMessage } from '@hookform/error-message'
import { useFormContext } from 'react-hook-form'

export type InputProps = {
  registeredName: string
  label: string
  placeholder?: string
  type: string
  unit?: string
  description?: React.ReactElement
}

const BasicInput: React.FC<InputProps> = ({
  registeredName,
  label,
  placeholder,
  type,
  description,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const { name } = register(registeredName)

  return (
    <>
      <label className='text-textGray text-sm'>{label}</label>
      <input
        {...register(registeredName)}
        name={name}
        placeholder={placeholder}
        type={type}
        className='border border-borderGray rounded-btn text-base bg-bgWhite rounded-sm px-4 py-2 text-textBlack w-full'
      />
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

export { BasicInput }
