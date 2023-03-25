import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import * as z from 'zod'
import InputControl from './InputControl'
import UnitInput from './UnitInput'

export default {
  title: 'Components/Atmos/Input',
  component: { InputControl, UnitInput },
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
      <div className='flex flex-row flex-wrap w-full'>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
            <InputControl
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
            </InputControl>
            <button type='submit'>Submit</button>
          </form>
        </FormProvider>
      </div>
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
    </div>
  )
}
