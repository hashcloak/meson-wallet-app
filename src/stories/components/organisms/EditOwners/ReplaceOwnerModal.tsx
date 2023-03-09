import { Dialog } from '@headlessui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import Button from '../../atoms/Button/Button'
import NewOwnerInput from '../../molecules/OwnerInfoInput/NewOwnerInput'

import { EditOwnerModalType as ReplaceOwnerModalType } from './EditOwnerModal'
import { OwnerType } from './EditOwners'

import EthAddress from '~/stories/utils/Ethereum/EthAddress'
import { mockOwners } from '~/stories/utils/Mock'
import Spacer from '~/utils/Spacer'

type ReplaceOwnerInputType = {
  name: string
  address: string
  onClose: () => void
  onPageChange: () => void
  onSetNewOwner: (data: NewOwnerType) => void
}

type ReplaceOwnerDetailsProps = {
  newOwner: NewOwnerType
  name: string
  address: string
  onClose: () => void
}

type NewOwnerType = { newOwnerAddress: string; newOwnerName: string }

const ReplaceOwnerInput: React.FC<ReplaceOwnerInputType> = ({
  onClose,
  name,
  address,
  onPageChange,
  onSetNewOwner,
}) => {
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
  })

  const methods = useForm({
    defaultValues: {
      newOwnerName: '',
      newOwnerAddress: '',
    },
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: any) => {
    onSetNewOwner(data)
    onPageChange && onPageChange()
  }

  const onError = (errors: any, e: any) => console.log('Error:', errors, e)

  return (
    <div className='flex flex-col text-textWhite'>
      <span className='text-lg'>Current owner</span>
      <div className=' bg-bgDarkLight p-4 flex flex-col rounded-2xl'>
        <div className='pl-4'>
          <EthAddress
            ethAddress={address}
            size={4.5}
            length={'full'}
            walletName={name}
          />
        </div>
      </div>

      <Spacer size={32} axis={'vertical'} />

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
          <span className='text-lg'>New owner</span>
          <div className=' bg-bgDarkLight p-4 flex flex-col rounded-2xl'>
            <NewOwnerInput />
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

const ReplaceOwnerDetails: React.FC<ReplaceOwnerDetailsProps> = ({
  onClose,
  newOwner,
  name,
  address,
}) => {
  const [filteredOwners, setFilteredOwners] = useState<OwnerType[]>([])

  useEffect(() => {
    const filterOwners = mockOwners.filter((owner) => {
      return (
        owner.address !== address && owner.address !== newOwner.newOwnerAddress
      )
    })
    setFilteredOwners(filterOwners)
    console.log(filteredOwners, newOwner, name, address)
  }, [])

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
              <span className='text-lg text-textWhite'>1 out of 2 owners</span>
            </div>
          </div>
        </div>

        <div className='flex flex-col w-full'>
          <span className='text-xl underline'>Owners</span>
          <Spacer size={8} axis={'vertical'} />
          <div className='pl-2 w-full'>
            {/* Owners */}
            {filteredOwners &&
              filteredOwners.map((owner: OwnerType) => (
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

            <div className='flex flex-col justify-center p-2 mb-2 bg-[#DC2626] rounded-2xl h-[4.5rem] box-border w-full'>
              <span className='font-bold'>Removing owner</span>
              <EthAddress
                ethAddress={address}
                size={4.5}
                length={'full'}
                icons={true}
                walletName={name}
              />
            </div>

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

const ReplaceOwnerModal: React.FC<ReplaceOwnerModalType> = ({
  isOpen,
  onClose,
  name,
  address,
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
                Replace owner
              </span>

              <Dialog.Description>
                {/* Description */}

                {!pageChange ? (
                  <ReplaceOwnerInput
                    onClose={onClose}
                    name={name}
                    address={address}
                    onPageChange={handlePageChange}
                    onSetNewOwner={setNewOwner}
                  />
                ) : (
                  <ReplaceOwnerDetails
                    onClose={onClose}
                    newOwner={newOwner!}
                    name={name}
                    address={address}
                  />
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

export default ReplaceOwnerModal
