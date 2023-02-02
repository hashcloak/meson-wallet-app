import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import * as z from 'zod'

import { BasicInput } from './BasicInput'
import { UnitInput } from './UnitInput'

import { DisplayBox } from '~/utils/DisplayBox'

export default {
  title: 'Components/Inputs',
  component: { BasicInput, UnitInput },
}

export const Inputs = () => {
  const regjisteredName01 = 'walletName'
  const schema = z.object({
    walletName: z.string().min(1, { message: 'Wallet name is required' }),
    depositAmount: z.nan().or(z.number().int()),
  })

  const description01 = (
    <p>
      By continuing you consent to{' '}
      <a href='' className='text-textLink'>
        the terms of use
      </a>
      and privacy policy.
    </p>
  )

  const methods = useForm({ resolver: zodResolver(schema) })
  const onSubmit = (data: any) => console.log(data)

  return (
    <div className='flex flex-row w-screen flex-wrap'>
      <DisplayBox title={'Basic input'}>
        <div className='flex flex-row flex-wrap w-full'>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <BasicInput
                label='Name of the new Meson Wallet'
                placeholder='Your-wallet-name*'
                type='text'
                registeredName={regjisteredName01}
                description={description01}
              />
              <input type='submit' />
            </form>
          </FormProvider>
        </div>
      </DisplayBox>
    </div>
  )
}

export const UnitInputs = () => {
  const regjisteredName02 = 'depositAmount'

  const schema = z.object({
    walletName: z.string().min(1, { message: 'Wallet name is required' }),
    depositAmount: z.nan().or(z.number().int()),
  })

  const description02 = <p />

  const methods = useForm({ resolver: zodResolver(schema) })
  const onSubmit = (data: any) => console.log(data)

  return (
    <div className='flex flex-row w-screen flex-wrap'>
      <DisplayBox title={'Unit input'}>
        <div className='flex flex-row flex-wrap w-full'>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <UnitInput
                label='Deposit amount (optional)'
                type='number'
                placeholder='Optional'
                unit='ETH'
                registeredName={regjisteredName02}
                description={description02}
              />
              <input type='submit' />
            </form>
          </FormProvider>
        </div>
      </DisplayBox>
    </div>
  )
}
