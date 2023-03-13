import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import Button from '../../atoms/Button/Button'
import { UnitInput } from '../../atoms/Input/UnitInput'

import StepContentLayout from '~/stories/utils/Layout/StepContentLayout'
import StepWrapper from '~/stories/utils/Layout/StepWrapper'
import Spacer from '~/utils/Spacer'

const DepositFund = () => {
  const register = 'depositAmount'

  const schema = z.object({
    depositAmount: z.preprocess((value) => {
      if (typeof value !== 'string') {
        return Number(value)
      }
      if (value.trim() === '') {
        return NaN
      }
      return Number(value)
    }, z.union([z.number().nonnegative(), z.number().gt(0)]).optional()),
  })

  const methods = useForm({ resolver: zodResolver(schema) })
  const onSubmit = (data: any) => console.log(data)
  const onError = (errors: any, e: any) => console.log('Error:', errors, e)

  return (
    <div className='flex flex-col justify-center items-center w-full h-full box-border'>
      <div>
        <span className='text-textWhite text-2xl font-bold'>
          ④ Create wallet
        </span>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
            <StepWrapper>
              {/* 1st row */}
              <StepContentLayout>
                <div className='flex flex-col text-textWhite text-base max-w-[35rem]'>
                  <div>
                    <span className='text-xl underline'>Deposit funds</span>
                    <span className='text-sm'>(Optional)</span>
                  </div>
                  <Spacer size={8} axis={'vertical'} />
                  <div className='pl-4'>
                    <div className='flex flex-col mb-2'>
                      <span className='text-lg text-textWhite'>
                        You can transfer funds from your signer wallet, but make
                        sure you have enough funds in it.
                      </span>
                    </div>
                  </div>
                </div>

                <div className='flex flex-col text-textWhite text-base max-w-[35rem] justify-center'>
                  <div className='pl-4'>
                    <UnitInput
                      registeredName={register}
                      label={'Deposit amount (optional)'}
                      type='text'
                      unit='ETH'
                      placeholder={'Optional'}
                    >
                      <span className='text-textGrayLight'>≈ 000.00 USD</span>
                    </UnitInput>
                  </div>
                </div>
              </StepContentLayout>

              {/* Button */}
              <StepContentLayout isBtn={true}>
                <Button
                  btnVariant={'text'}
                  btnSize={'lg'}
                  btnType={'button'}
                  handleClick={() => console.log('Back')}
                >
                  Back
                </Button>
                {/* TODO:Button validation needs to be updated based on signer wallet connection */}
                <Button
                  btnVariant={'primary'}
                  btnSize={'lg'}
                  btnType={'submit'}
                >
                  Create
                </Button>
              </StepContentLayout>
            </StepWrapper>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default DepositFund
