import { Dialog } from '@headlessui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import Button from '../../atoms/Button/Button'
import { InputControl } from '../../atoms/Input/InputControl'

import EthAddress from '~/stories/utils/Ethereum/EthAddress'
import Spacer from '~/utils/Spacer'

export type EditOwnerModalType = {
  isOpen: boolean
  onClose: () => void
  name: string
  address: string
}

export type EditOwnerDetailsType = {
  onClose: () => void
  name: string
  address: string
}

const EditOwnerDetails: React.FC<EditOwnerDetailsType> = ({
  onClose,
  name,
  address,
}) => {
  const schema = z.object({
    newName: z.string().min(1, { message: 'Name is required' }),
    newAddress: z.string().min(1, { message: 'Address is required' }),
  })

  const methods = useForm({
    defaultValues: {
      newName: name,
    },
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: any) => {
    console.log(data)
    onClose()
  }

  const onError = (errors: any, e: any) => console.log('Error:', errors, e)

  return (
    <div className='flex flex-col text-textWhite'>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
          <div className=' bg-bgDarkLight p-4'>
            <InputControl
              label='Name'
              placeholder='Name*'
              type='text'
              registeredName={'newName'}
            />
            <Spacer size={8} axis={'vertical'} />
            <EthAddress ethAddress={address} size={4.5} length={'full'} />
          </div>
          <Spacer size={32} axis={'vertical'} />
          <div className='flex flex-row justify-around'>
            <Button
              btnVariant={'text'}
              btnSize={'lg'}
              btnType={'button'}
              handleClick={onClose}
            >
              <span className='text-lg'>Cancel</span>
            </Button>
            <Button btnVariant={'primary'} btnSize={'lg'} btnType={'submit'}>
              Save
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

const EditOwnerModal: React.FC<EditOwnerModalType> = ({
  isOpen,
  onClose,
  name,
  address,
}) => {
  return (
    <>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={onClose}
          className='fixed z-10 inset-0 overflow-y-auto'
          // static
        >
          <div className='flex items-center justify-center min-h-screen'>
            <Dialog.Overlay
              className='fixed inset-0 bg-neutral-900 opacity-30'
              aria-hidden='true'
            />
            <Dialog.Panel className='relative bg-bgDarkMid rounded-2xl py-6 px-8'>
              <span className='text-textWhite text-2xl font-bold'>
                Edit owner
              </span>

              <Dialog.Description className='p-6'>
                {/* Description */}
                <EditOwnerDetails
                  onClose={onClose}
                  name={name}
                  address={address}
                />
                {/* Description */}
              </Dialog.Description>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </>
  )
}

export default EditOwnerModal
