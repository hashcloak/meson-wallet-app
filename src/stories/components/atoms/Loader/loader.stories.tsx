import { useEffect, useState } from 'react'

import Button from '../Button/Button'

import Loader from './Loader'
import LoaderSuccess from './LoaderSuccess'

import { DisplayBox } from '~/utils/DisplayBox'

export default {
  title: 'Components/Atmos/Loaders',
  component: Loader,
}

export const Loaders = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const onClose = () => {
    setIsLoading(!isLoading)
  }

  useEffect(() => {
    setTimeout(() => {
      setIsSuccess(!isSuccess)
    }, 5000)
  }, [isLoading])

  return (
    <div className='flex flex-row w-screen flex-wrap'>
      <DisplayBox title={'Loader'}>
        <Button
          btnVariant={'text'}
          btnSize={'md'}
          btnType={'button'}
          handleClick={onClose}
        >
          Submit
        </Button>
        <div className='flex flex-row flex-wrap w-full'>
          {!isSuccess ? (
            <Loader isLoading={isLoading} />
          ) : (
            <LoaderSuccess isLoading={isLoading} />
          )}
        </div>
      </DisplayBox>
    </div>
  )
}
