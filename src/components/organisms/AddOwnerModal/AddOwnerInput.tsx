import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { NewOwnerType } from '.'
import { Button } from '@/components/atoms/Button'
import OptionControl, { Options } from '@/components/atoms/Option/OptionControl'
import NewOwnerInput from '@/components/molecules/NewOwnerInput'
import { mockOwners } from '@/utils/Mock'
import Spacer from '@/utils/Spacer'

type AddOwnerInputType = {
  onClose: () => void
  onPageChange: () => void
  onSetNewOwner: (data: NewOwnerType) => void
}

const AddOwnerInput: React.FC<AddOwnerInputType> = ({ onClose, onPageChange, onSetNewOwner }) => {
  const [numOfConfirmation, setNumOfConfirmation] = useState<Options[]>([])

  const schema = z.object({
    newOwnerName: z.preprocess((value) => {
      if (typeof value !== 'string') {
        return String(value)
      }
      if (value.trim() === '') {
        return ''
      }
      return String(value)
    }, z.string().optional()),
    newOwnerAddress: z.string().min(1, { message: 'Owner Address is required' }),
    confirmation: z.string(),
  })

  const methods = useForm({
    defaultValues: {
      newOwnerName: '',
      newOwnerAddress: '',
      confirmation: '1',
    },
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: any) => {
    onSetNewOwner(data)
    onPageChange && onPageChange()
  }

  const onError = (errors: any, e: any) => console.log('Error:', errors, e)

  useEffect(() => {
    const fields = [...mockOwners]
    fields.push({ address: '', name: '' })

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
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
          <span className='text-lg'>New owner</span>
          <div className=' bg-bgDarkLight p-4 flex flex-col rounded-2xl'>
            <NewOwnerInput />
          </div>

          <Spacer size={32} axis={'vertical'} />

          <span className='text-lg'>New required owner confirmation</span>
          <div className='bg-bgDarkLight p-4 rounded-2xl flex flex-col'>
            <span>Any transaction requires the confirmation of:</span>
            <div className='grid grid-cols-4'>
              <div className='col-span-1 mr-2'>
                <OptionControl options={numOfConfirmation} registeredName={'confirmation'} />
              </div>
              <span className='col-span-3'>out of {numOfConfirmation.length} owner(s)</span>
            </div>
          </div>

          <Spacer size={32} axis={'vertical'} />
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

export default AddOwnerInput
