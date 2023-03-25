import { Dialog } from '@headlessui/react'
import { FormProvider, useForm } from 'react-hook-form'
import { Button } from '@/components/atoms/Button'
import Spacer from '@/utils/Spacer'

type Props = {
  isOpen: boolean
  onClose: () => void
  name: string
  address: string
}

type DeleteContactDetailsType = {
  onClose: () => void
  name: string
  address: string
}

const DeleteContactDetails: React.FC<DeleteContactDetailsType> = ({ onClose, name, address }) => {
  const methods = useForm({
    defaultValues: {
      newName: name,
      newAddress: address,
    },
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
          <span className='text-lg'>
            Are you sure you want to permanently delete the following contact?
          </span>
          <div className='w-full flex justify-center'>
            <div className='grid grid-cols-[20%_80%]'>
              <span>Name:</span>
              <span>{name}</span>
              <span>Address:</span>
              <span>{address}</span>
            </div>
          </div>

          <Spacer size={32} axis={'vertical'} />
          <div className='flex flex-row justify-around'>
            <Button btnVariant={'text'} btnSize={'lg'} btnType={'button'} handleClick={onClose}>
              <span className='text-lg'>Close</span>
            </Button>
            <Button btnVariant={'alert'} btnSize={'lg'} btnType={'submit'}>
              Delete
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

const DeleteContactModal: React.FC<Props> = ({ isOpen, onClose, name, address }) => {
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
              <span className='text-textWhite text-2xl font-bold'>Delete contact</span>

              <Dialog.Description className='p-6'>
                {/* Description */}
                <DeleteContactDetails onClose={onClose} name={name} address={address} />
                {/* Description */}
              </Dialog.Description>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </>
  )
}

export default DeleteContactModal
