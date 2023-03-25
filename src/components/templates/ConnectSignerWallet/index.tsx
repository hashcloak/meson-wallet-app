import { zodResolver } from '@hookform/resolvers/zod'
import React, { ChangeEvent, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/atoms/Button'
import CustomLink from '@/components/atoms/CustomLink'
import { InputControl } from '@/components/atoms/Input'
import { Option } from '@/components/atoms/Option'
import SignerWallets from '@/components/molecules/SignerWallets'
import { StepContentLayout, StepWrapper } from '@/utils/Layouts'
import { mockNetworks } from '@/utils/Mock'
import Spacer from '@/utils/Spacer'

const ConnectSignerWallet = () => {
  const [userInput, setUserInput] = useState('')

  const register = 'walletName'
  const schema = z.object({
    walletName: z.string().min(1, { message: 'Wallet name is required' }),
  })

  const methods = useForm({ resolver: zodResolver(schema) })
  const onSubmit = (data: any) => alert(JSON.stringify(data))
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setUserInput(e.target.value)
  }

  return (
    <div className='flex flex-col justify-center items-center w-full h-full box-border'>
      <div>
        <span className='text-textWhite text-2xl font-bold'>① Connect your signer wallet</span>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <StepWrapper>
              {/* 1st row */}
              <StepContentLayout>
                <div className='flex flex-col text-textWhite text-base max-w-[35rem]'>
                  <span>
                    In order to select the network to create your Meson Wallet, your wallet need to
                    be connected.{' '}
                    <CustomLink url={''} size={'base'}>
                      Why do you need to connect a signer wallet?
                    </CustomLink>
                  </span>
                  <Spacer size={24} axis={'vertical'} />
                  <span>Select network on which the Meson wallet was created</span>
                </div>
                <div className='flex flex-col'>
                  <div className='flex flex-wrap gap-2 '>
                    <SignerWallets />
                  </div>
                  <Spacer size={24} axis={'vertical'} />
                  <div className='w-1/3'>
                    <Option options={mockNetworks} />
                  </div>
                </div>
              </StepContentLayout>

              {/* 2nd row */}
              <StepContentLayout>
                <div className='flex flex-col text-textWhite text-base max-w-[35rem]'>
                  <span className='text-xl underline'>Name of your wallet</span>
                  <Spacer size={8} axis={'vertical'} />
                  <span>
                    This name is only stored locally and will never be shared with Meson or any
                    third parties.{' '}
                  </span>
                </div>
                <div className='flex flex-col'>
                  <InputControl
                    label='Name of the new Meson Wallet'
                    placeholder='Your-wallet-name*'
                    type='text'
                    registeredName={register}
                    handleChange={onChange}
                  >
                    <span className='text-textWhite text-sm'>
                      By continuing you consent to{' '}
                      <CustomLink url={''} size={'sm'}>
                        the terms of use
                      </CustomLink>
                      and
                      <CustomLink url={''} size={'sm'}>
                        privacy policy
                      </CustomLink>
                      .
                    </span>
                  </InputControl>
                </div>
              </StepContentLayout>

              {/* Button */}
              <StepContentLayout isBtn={true}>
                <Button
                  btnVariant={'text'}
                  btnSize={'lg'}
                  btnType={'button'}
                  handleClick={() => console.log('Cancel')}
                >
                  Cancel
                </Button>
                {/* TODO:Button validation needs to be updated based on signer wallet connection */}
                <Button
                  btnVariant={userInput.length ? 'primary' : 'disable'}
                  btnSize={'lg'}
                  btnType={'submit'}
                  disabled={userInput.length! ? false : true}
                >
                  Next
                </Button>
              </StepContentLayout>
            </StepWrapper>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default ConnectSignerWallet
