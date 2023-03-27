import { useEffect, useState } from 'react'

import Button from '../Button/Button'

import { Loader, LoaderSuccess } from '.'

export default {
  title: 'Components/Atmos/Loaders',
  component: { Loader, LoaderSuccess },
}

export const Default = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const onClose = () => {
    setIsLoading(!isLoading)
  }

  useEffect(() => {
    setTimeout(() => {
      setIsSuccess(!isSuccess)
    }, 8000)
  }, [isLoading])

  return (
    <div className='flex flex-row w-screen flex-wrap'>
      <Button btnVariant={'text'} btnSize={'md'} btnType={'button'} handleClick={onClose}>
        Submit
      </Button>
      <div className='flex flex-row flex-wrap w-full'>
        {!isSuccess ? <Loader isLoading={isLoading} /> : <LoaderSuccess isLoading={isLoading} />}
      </div>
    </div>
  )
}
