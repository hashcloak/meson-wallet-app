import { Dialog } from '@headlessui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import Button from '../../atoms/Button/Button'
import { InputControl } from '../../atoms/Input/InputControl'

import Spacer from '~/utils/Spacer'

type Props = {
  isOpen: boolean
  onClose: () => void
}

type AddNewContactDetailsType = {
  onClose: () => void
}

const AddNewContactDetails: React.FC<AddNewContactDetailsType> = ({
  onClose,
}) => {
  const schema = z.object({
    newName: z.string().min(1, { message: 'Name is required' }),
    newAddress: z.string().min(1, { message: 'Address is required' }),
  })

  const methods = useForm({
    defaultValues: {
      newName: '',
      newAddress: '',
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
          <InputControl
            label='Name'
            placeholder='Name*'
            type='text'
            registeredName={'newName'}
          />
          <Spacer size={8} axis={'vertical'} />
          <InputControl
            label='Address'
            placeholder='0xfF0000000000000000000000000000000000*'
            type='text'
            registeredName={'newAddress'}
          />

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

const AddNewContactModal: React.FC<Props> = ({ isOpen, onClose }) => {
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
                Add new contact
              </span>

              <Dialog.Description className='p-6'>
                {/* Description */}
                <AddNewContactDetails onClose={onClose} />
                {/* Description */}
              </Dialog.Description>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </>
  )
}

export default AddNewContactModal
