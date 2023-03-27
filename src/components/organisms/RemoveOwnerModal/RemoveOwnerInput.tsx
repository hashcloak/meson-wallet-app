import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Button } from '@/components/atoms/Button'
import { Options } from '@/components/atoms/Option/OptionControl'
import OwnerConfirmation from '@/components/molecules//OwnerConfirmation'
import EthAddress from '@/utils/Ethereum/EthAddress'
import Spacer from '@/utils/Spacer'

type RemoveOwnerInputType = {
  name: string
  address: string
  onClose: () => void
  onPageChange: () => void
  onNewConfirmation: (data: any) => void
}

const RemoveOwnerInput: React.FC<RemoveOwnerInputType> = ({
  onClose,
  name,
  address,
  onPageChange,
  onNewConfirmation,
}) => {
  const [numOfConfirmation, setNumOfConfirmation] = useState<Options[]>([])

  const methods = useForm({
    defaultValues: {
      confirmation: '1',
    },
  })

  const onSubmit = (data: any) => {
    onNewConfirmation(data.confirmation)
    onPageChange && onPageChange()
  }

  const onError = (errors: any, e: any) => console.log('Error:', errors, e)

  useEffect(() => {
    const fields = [1, 2]
    const numOfOwners: Options[] = fields.map((_, index) => {
      return {
        value: String(index + 1),
        label: String(index + 1),
        bg: 'bg-bgGray text-textBlack',
      }
    })
    setNumOfConfirmation(numOfOwners)
  }, [])

  return (
    <div className='flex flex-col text-textWhite'>
      <span className='text-lg'>Removing owner</span>
      <div className=' bg-bgDarkLight p-4 flex flex-col rounded-2xl'>
        <div className='pl-4'>
          <EthAddress ethAddress={address} size={4.5} length={'full'} walletName={name} />
        </div>
      </div>
      <Spacer size={32} axis={'vertical'} />

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
          <span className='text-lg'>New required owner confirmation</span>
          <div className='bg-bgDarkLight p-4 rounded-2xl flex flex-col'>
            <OwnerConfirmation numOfConfirmation={numOfConfirmation} />
          </div>
          <Spacer size={24} axis={'vertical'} />

          <div className='flex flex-row justify-around'>
            <Button btnVariant={'text'} btnSize={'lg'} btnType={'button'} handleClick={onClose}>
              <span className='text-lg'>Cancel</span>
            </Button>
            <Button btnVariant={'primary'} btnSize={'lg'} btnType={'submit'}>
              Review
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default RemoveOwnerInput
