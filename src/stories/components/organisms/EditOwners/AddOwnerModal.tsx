import { Dialog } from '@headlessui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import Button from '../../atoms/Button/Button'
import { InputControl } from '../../atoms/Input/InputControl'
import OptionControl, { Options } from '../../atoms/Option/OptionControl'

import { OwnerType } from './EditOwners'

import EthAddress from '~/stories/utils/Ethereum/EthAddress'
import { mockOwners } from '~/stories/utils/Mock'
import Spacer from '~/utils/Spacer'

type AddOwnerInputType = {
  onClose: () => void
  onPageChange: () => void
  onSetNewOwner: (data: NewOwnerType) => void
}

type AddOwnerDetailsProps = {
  newOwner: NewOwnerType
  onClose: () => void
}

type NewOwnerType = {
  newOwnerAddress: string
  newOwnerName: string
  confirmation: string
}

const AddOwnerInput: React.FC<AddOwnerInputType> = ({
  onClose,
  onPageChange,
  onSetNewOwner,
}) => {
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
    newOwnerAddress: z
      .string()
      .min(1, { message: 'Owner Address is required' }),
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
            <InputControl
              label='Owner name'
              placeholder='Owner name'
              type='text'
              registeredName={'newOwnerName'}
            />

            <Spacer size={16} axis={'vertical'} />

            <InputControl
              label='Owner address'
              placeholder='0xfF0000000000000000000000000000000000*'
              type='text'
              registeredName={'newOwnerAddress'}
            />
          </div>

          <Spacer size={32} axis={'vertical'} />

          <div className='bg-bgDarkLight p-4 rounded-2xl flex flex-col'>
            <span className='text-lg'>New required owner confirmation</span>
            <Spacer size={24} axis={'vertical'} />
            <span>Any transaction requires the confirmation of:</span>
            <div className='grid grid-cols-4'>
              <div className='col-span-1 mr-2'>
                <OptionControl
                  options={numOfConfirmation}
                  registeredName={'confirmation'}
                />
              </div>
              <span className='col-span-3'>
                out of {numOfConfirmation.length} owner(s)
              </span>
            </div>
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
              Review
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

const AddOwnerDetails: React.FC<AddOwnerDetailsProps> = ({
  onClose,
  newOwner,
}) => {
  return (
    <>
      <div className='grid grid-cols-[30%_1fr] gap-5 rounded-2xl bg-bgDarkLight p-4 w-full  text-textWhite text-base '>
        <div className='flex flex-col w-full'>
          <span className='text-xl underline'>Details</span>
          <Spacer size={8} axis={'vertical'} />
          <div className='pl-2'>
            <div className='flex flex-col mb-2'>
              <span className='text-sm text-textGrayLight'>
                Name of the Meson Wallet
              </span>
              <span className='text-lg text-textWhite'>Sample wallet</span>
            </div>
            <div className='flex flex-col mb-2'>
              <span className='text-sm text-textGrayLight'>
                Address of the Meson Wallet
              </span>
              <EthAddress
                ethAddress={'0xf86B25473cC08F04DA275B2847F2448cf041Fbd5'}
                size={4.5}
                length={'short'}
              />
            </div>
            <div className='flex flex-col mb-2'>
              <span className='text-sm text-textGrayLight'>
                Selected network
              </span>
              <span className='text-lg text-textWhite'>Ethereum</span>
            </div>
            <div className='flex flex-col mb-2'>
              <span className='text-sm text-textGrayLight'>
                Required confirmation
              </span>
              <span className='text-lg text-textWhite'>
                {newOwner.confirmation} out of {mockOwners.length + 1} owners
              </span>
            </div>
          </div>
        </div>

        <div className='flex flex-col w-full'>
          <span className='text-xl underline'>Owners</span>
          <Spacer size={8} axis={'vertical'} />
          <div className='pl-2 w-full'>
            {/* Owners */}
            {mockOwners &&
              mockOwners.map((owner: OwnerType) => (
                <EthAddress
                  ethAddress={owner.address}
                  size={4.5}
                  length={'full'}
                  icons={true}
                  walletName={owner.name}
                  key={owner.address}
                />
              ))}

            <Spacer size={8} axis={'vertical'} />

            <div className='flex flex-col justify-center p-2 mb-2 bg-[#397F97] rounded-2xl h-[4.5rem] box-border w-full'>
              <span className='font-bold'>New owner</span>
              <EthAddress
                ethAddress={newOwner && newOwner.newOwnerAddress}
                size={4.5}
                length={'full'}
                icons={true}
                walletName={newOwner?.newOwnerName}
              />
            </div>
          </div>
        </div>
      </div>
      <Spacer size={16} axis={'vertical'} />
      <div
        tabIndex={0}
        className='collapse collapse-arrow border border-base-300 bg-base-100 rounded-box'
      >
        <div className='collapse-title text-base font-bold bg-bgDarkLight'>
          Advanced parameters
        </div>
        <div className='collapse-content flex flex-col w-full bg-bgDarkLight'>
          <div className='flex flex-row justify-around w-full'>
            <span>Nonce</span>
            <span>33</span>
          </div>
          <div className='flex flex-row justify-around w-full'>
            <span>TxGas</span>
            <span>43634</span>
          </div>
        </div>
      </div>
      <Spacer size={32} axis={'vertical'} />

      <div className='flex flex-row justify-around'>
        <Button
          btnVariant={'text'}
          btnSize={'lg'}
          btnType={'button'}
          handleClick={onClose}
        >
          <span className='text-lg'>Back</span>
        </Button>
        <Button btnVariant={'primary'} btnSize={'lg'} btnType={'submit'}>
          Submit
        </Button>
      </div>
    </>
  )
}

const AddOwnerModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [pageChange, setPageChange] = useState(false)
  const [newOwner, setNewOwner] = useState<NewOwnerType | null>(null)

  const handlePageChange = () => {
    setPageChange(!pageChange)
  }

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
                Add new owner
              </span>

              <Dialog.Description>
                {/* Description */}

                {!pageChange ? (
                  <AddOwnerInput
                    onClose={onClose}
                    onPageChange={handlePageChange}
                    onSetNewOwner={setNewOwner}
                  />
                ) : (
                  <AddOwnerDetails onClose={onClose} newOwner={newOwner!} />
                )}
                {/* Description */}
              </Dialog.Description>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </>
  )
}

export default AddOwnerModal
