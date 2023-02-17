import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import * as z from 'zod'

import { BasicInput } from './BasicInput'
import { UnitInput } from './UnitInput'

import { DisplayBox } from '~/utils/DisplayBox'

export default {
  title: 'Components/Atmos/Inputs',
  component: { BasicInput, UnitInput },
}

export const Inputs = () => {
  const register = 'walletName'

  const schema = z.object({
    walletName: z.string().min(1, { message: 'Wallet name is required' }),
  })

  const methods = useForm({ resolver: zodResolver(schema) })
  const onSubmit = (data: any) => console.log(data)
  const onError = (errors: any, e: any) => console.log('Error:', errors, e)

  return (
    <div className='flex flex-row w-screen flex-wrap'>
      <DisplayBox title={'Basic input'}>
        <div className='flex flex-row flex-wrap w-full'>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
              <BasicInput
                label='Name of the new Meson Wallet'
                placeholder='Your-wallet-name*'
                type='text'
                registeredName={register}
              >
                <p>
                  By continuing you consent to{' '}
                  <a href='' className='text-textLink'>
                    the terms of use
                  </a>
                  and privacy policy.
                </p>
              </BasicInput>
              <button type='submit'>Submit</button>
            </form>
          </FormProvider>
        </div>
      </DisplayBox>
    </div>
  )
}

export const UnitInputs = () => {
  const register = 'depositAmount'

  const schema = z.object({
    depositAmount: z.nan().or(z.number().int()),
  })

  const methods = useForm({ resolver: zodResolver(schema) })
  const onSubmit = (data: any) => console.log(data)
  const onError = (errors: any, e: any) => console.log('Error:', errors, e)

  return (
    <div className='flex flex-row w-screen flex-wrap'>
      <DisplayBox title={'Unit input'}>
        <div className='flex flex-row flex-wrap w-full'>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
              <UnitInput
                label='Deposit amount (optional)'
                type='number'
                placeholder='Optional'
                unit='ETH'
                registeredName={register}
              >
                <p>
                  By continuing you consent to{' '}
                  <a href='' className='text-textLink'>
                    the terms of use
                  </a>
                  and privacy policy.
                </p>
              </UnitInput>
              <input type='submit' />
            </form>
          </FormProvider>
        </div>
      </DisplayBox>
    </div>
  )
}
