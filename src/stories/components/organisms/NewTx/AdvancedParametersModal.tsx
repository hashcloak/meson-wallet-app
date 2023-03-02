import { Dialog } from '@headlessui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import Button from '../../atoms/Button/Button'
import { Icon } from '../../atoms/Icon/Icon'
import { Logo, LogoTypes } from '../../atoms/Icon/Logo'
import { InputControl } from '../../atoms/Input/InputControl'
import { UnitInput } from '../../atoms/Input/UnitInput'
import CustomOption from '../../atoms/Option/CustomOption'

import EthAddress from '~/stories/utils/Ethereum/EthAddress'
import Spacer from '~/utils/Spacer'

type AdvancedParamsInputPropsType = {
  onClose: () => void
}

const AdvancedParametersInput: React.FC<AdvancedParamsInputPropsType> = ({
  onClose,
}) => {
  const ethAddress = '0xfF501B324DC6d78dC9F983f140B9211c3EdB4dc7'
  const [nonce, setNonce] = useState(0)
  const [txGas, setTxGas] = useState(0)

  const schema = z.object({
    newNonce: z.preprocess((value) => {
      if (typeof value !== 'string') {
        return Number(value)
      }
      if (value.trim() === '') {
        return NaN
      }
      return Number(value)
    }, z.union([z.number().nonnegative(), z.number().gt(0)]).optional()),
    newTxGas: z.preprocess((value) => {
      if (typeof value !== 'string') {
        return Number(value)
      }
      if (value.trim() === '') {
        return NaN
      }
      return Number(value)
    }, z.union([z.number().nonnegative(), z.number().gt(0)]).optional()),
  })

  const methods = useForm({
    defaultValues: {
      newNonce: nonce,
      newTxGas: txGas,
    },
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: any) => {
    console.log(data)
    setNonce(data.newNonce)
    setTxGas(data.newTxGas)
    onClose()
  }

  const onError = (errors: any, e: any) => console.log('Error:', errors, e)

  return (
    <div className='flex flex-col justify-center items-center text-textWhite'>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
          <div className='flex flex-row justify-center'>
            <div>
              <span className='text-left'>Current Nonce</span>
              <div className='flex justify-center items-center rounded-2xl bg-bgDarkLight p-4 w-[8rem] h-[4.5rem]'>
                <span>{nonce}</span>
              </div>
            </div>{' '}
            <Spacer size={8} axis={'horizontal'} />
            <div className='-rotate-90 flex items-center'>
              <Icon type={'ArrowNarrowDown'} size={'5xl'} color={'white'} />
            </div>
            <Spacer size={8} axis={'horizontal'} />
            <div>
              <span className='text-left'>New Nonce</span>
              <div className='flex flex-col justify-center items-center rounded-2xl bg-bgDarkLight p-4 w-[8rem] h-[4.5rem]'>
                <InputControl
                  label=''
                  placeholder='Nonce'
                  type='number'
                  registeredName={'newNonce'}
                />
              </div>
            </div>
          </div>

          <Spacer size={16} axis={'vertical'} />

          <div className='flex flex-row justify-center'>
            <div>
              <span className='text-left'>Current TxGas</span>
              <div className='flex justify-center items-center rounded-2xl bg-bgDarkLight p-4 w-[8rem] h-[4.5rem]'>
                <span>{txGas}</span>
              </div>
            </div>{' '}
            <Spacer size={8} axis={'horizontal'} />
            <div className='-rotate-90 flex items-center'>
              <Icon type={'ArrowNarrowDown'} size={'5xl'} color={'white'} />
            </div>
            <Spacer size={8} axis={'horizontal'} />
            <div>
              <span className='text-left'>New TxGas</span>
              <div className='flex flex-col justify-center items-center rounded-2xl bg-bgDarkLight p-4 w-[8rem] h-[4.5rem]'>
                <InputControl
                  label=''
                  placeholder='TxGas'
                  type='number'
                  registeredName={'newTxGas'}
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
            <Button btnVariant={'primary'} btnSize={'lg'} btnType={'submit'}>
              Confirm
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const AdvancedParametersModal: React.FC<Props> = ({
  isOpen,
  onClose,
}) => {
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
                Advanced parameters
              </span>

              <Dialog.Description className='py-6'>
                {/* Description */}
                <AdvancedParametersInput onClose={onClose} />
                {/* Description */}
              </Dialog.Description>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </>
  )
}
