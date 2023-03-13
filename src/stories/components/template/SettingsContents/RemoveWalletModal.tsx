import { Dialog } from '@headlessui/react'
import { ErrorMessage } from '@hookform/error-message'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { object, z } from 'zod'

import Button from '../../atoms/Button/Button'

import EthAddress from '~/stories/utils/Ethereum/EthAddress'
import Spacer from '~/utils/Spacer'

type Props = {
  isOpen: boolean | undefined
  onClose: () => void
  onPageChange?: () => void
  address?: string
}

type RemoveWalletDetailsProps = {
  isOpen: boolean | undefined
  onClose: () => void
}

const RemoveWalletDetails: React.FC<RemoveWalletDetailsProps> = ({
  onClose,
}) => {
  const ethAddress = '0xfF501B324DC6d78dC9F983f140B9211c3EdB4dc7'
  const registerName = 'confirmToRemoveWallet'
  const [isChecked, setIsChecked] = useState(false)

  const schema = object({
    confirmToRemoveWallet: z.literal(true, {
      errorMap: () => ({ message: 'Please confirm to proceed' }),
    }),
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onChange', resolver: zodResolver(schema) })

  const onSubmit = (data: any): void => {
    console.log('owners', data)
    reset()
  }
  const onError = (errors: any, e: any) => console.log(errors, e)

  return (
    <div className='flex flex-col justify-center items-center text-textWhite'>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div>
          <div className='rounded-2xl bg-bgDarkLight p-4'>
            <div className='w-full items-center'>
              <EthAddress
                ethAddress={ethAddress}
                size={4.5}
                length={'full'}
                walletName={'My wallet'}
              />
            </div>

            <Spacer size={16} axis={'vertical'} />
            <div className='flex flex-row items-center'>
              <span>
                You are removing a Meson Wallet{' '}
                <span className='font-bold'>ONLY</span> from your interface. It
                does not delete the Meson wallet. You can always add it back
                using the above Meson wallet’s address
              </span>
            </div>
            <div className='form-control w-full items-center'>
              <label className='label cursor-pointer'>
                <input
                  type='checkbox'
                  className='checkbox'
                  {...register(registerName)}
                  onChange={() => setIsChecked((prevState) => !prevState)}
                />
                <span className='label-text'>
                  Confirm to remove a Meson wallet
                </span>
              </label>

              <ErrorMessage
                errors={errors}
                name={registerName}
                render={({ message }) => (
                  <p className='text-alert text-sm'>{message}</p>
                )}
              />
            </div>
          </div>
        </div>

        <Spacer size={32} axis={'vertical'} />
        <div className='flex flex-row justify-around'>
          <Button
            btnVariant={'text'}
            btnSize={'lg'}
            btnType={'button'}
            handleClick={() => {}}
          >
            <span className='text-lg'>Back</span>
          </Button>
          <Button
            btnVariant={isChecked ? 'alert' : 'disable'}
            btnSize={'lg'}
            btnType={'submit'}
            disabled={isChecked ? false : true}
            handleClick={onClose}
          >
            Remove
          </Button>
        </div>
      </form>
    </div>
  )
}

const RemoveWalletModal: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={onClose}
          className='fixed z-10 inset-0 overflow-y-auto'
          static
        >
          <div className='flex items-center justify-center min-h-screen'>
            <Dialog.Overlay
              className='fixed inset-0 bg-neutral-900 opacity-30'
              aria-hidden='true'
            />
            <Dialog.Panel className='relative bg-bgDarkMid rounded-2xl py-6 px-8 w-[40rem]'>
              <span className='text-textWhite text-2xl font-bold'>
                Remove wallet
              </span>

              <Dialog.Description className='py-6'>
                {/* Description */}
                <RemoveWalletDetails isOpen={isOpen} onClose={onClose} />
                {/* Description */}
              </Dialog.Description>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </>
  )
}

export default RemoveWalletModal
