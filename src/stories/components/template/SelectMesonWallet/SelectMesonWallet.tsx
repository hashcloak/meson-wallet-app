import { zodResolver } from '@hookform/resolvers/zod'
import React, { ChangeEvent, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import * as z from 'zod'

import Button from '../../atoms/Button/Button'
import { BasicInput } from '../../atoms/Input/BasicInput'
import CustomLink from '../../atoms/Link/CustomLink'
import CustomOption from '../../atoms/Option/CustomOption'
import { mock } from '../../atoms/Option/options.stories'

import StepContentLayout from '~/stories/utils/Layout/StepContentLayout'
import StepWrapper from '~/stories/utils/Layout/StepWrapper'
import Spacer from '~/utils/Spacer'

const SelectMesonWallet = () => {
  const [walletNameInput, setWalletNameInput] = useState('')
  const [walletAddressInput, setWalletAddressInput] = useState('')

  const schema = z.object({
    walletName: z.string().min(1, { message: 'Owner name is required' }),
    walletAddress: z.string().min(1, { message: 'Owner address is required' }),
    selectedNetwork: z.string(),
  })

  const methods = useForm({
    defaultValues: {
      walletName: '',
      walletAddress: '',
      selectedNetwork: mock[0],
    },
    resolver: zodResolver(schema),
  })
  const onSubmit = (data: any) => console.log(data)
  const handleWalletName = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setWalletNameInput(e.target.value)
  }
  const handleWalletAddress = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setWalletAddressInput(e.target.value)
  }

  return (
    <div className='flex flex-col justify-center items-center w-full h-full box-border'>
      <div>
        <span className='text-textWhite text-2xl font-bold'>
          ① Select Meson Wallet
        </span>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <StepWrapper>
              {/* 1st row */}
              <StepContentLayout>
                <div className='flex flex-col text-textWhite text-base max-w-[35rem]'>
                  <span>
                    Select network on which the Meson wallet was created
                  </span>
                </div>
                <div className='w-1/3'>
                  <CustomOption
                    options={mock}
                    registeredName={'selectedNetwork'}
                  />
                </div>
              </StepContentLayout>

              {/* 2nd row */}
              <StepContentLayout>
                <div className='flex flex-col text-textWhite text-base max-w-[35rem]'>
                  <span className='text-xl underline'>Name of your wallet</span>
                  <Spacer size={8} axis={'vertical'} />
                  <span>
                    This name is only stored locally and will never be shared
                    with Meson or any third parties.{' '}
                  </span>
                </div>
                <div className='flex flex-col'>
                  <BasicInput
                    label='Name of the new Meson Wallet'
                    placeholder='Your-wallet-name*'
                    type='text'
                    registeredName={'walletName'}
                    handleChange={(e) => handleWalletName(e)}
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
                  </BasicInput>
                </div>
              </StepContentLayout>

              {/* 3rd row */}
              <StepContentLayout>
                <div className='flex flex-col text-textWhite text-base max-w-[35rem]'>
                  <span className='text-xl underline'>Wallet address</span>
                  <Spacer size={8} axis={'vertical'} />
                  <span>
                    Enter your Meson wallet address. You will only have a
                    read-only view if your connected signer wallet is not the
                    owner of this Meson wallet.
                  </span>
                </div>
                <div className='flex flex-col'>
                  <label className='text-textGrayLight text-sm'>
                    Meson wallet Address
                  </label>
                  <BasicInput
                    label='Name of the new Meson Wallet'
                    placeholder='0xfF0000000000000000000000000000000000**'
                    type='text'
                    registeredName={'walletAddress'}
                    handleChange={(e) => handleWalletAddress(e)}
                  />
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
                  btnVariant={
                    walletAddressInput.length && walletNameInput.length
                      ? 'primary'
                      : 'disable'
                  }
                  btnSize={'lg'}
                  btnType={'submit'}
                  disabled={
                    walletAddressInput.length && walletNameInput.length!
                      ? false
                      : true
                  }
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

export default SelectMesonWallet
