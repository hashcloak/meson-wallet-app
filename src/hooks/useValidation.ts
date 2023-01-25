import { useState } from 'react'

type Props = {
  initialValue: string
  validationFn: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const useValidation: React.FC<Props> = ({ initialValue, validationFn }) => {
  const [value, setValue] = useState(initialValue)
  const [error, setError] = useState(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)

    if (!value) {
      setError(validationFn(e.target.value))
    } else {
      setError(null)
    }
  }

  return { value, error, onChange: handleChange }
}

export default useValidation
