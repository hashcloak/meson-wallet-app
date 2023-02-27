import { Dialog } from '@headlessui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import Button from '../../atoms/Button/Button'
import { Icon } from '../../atoms/Icon/Icon'
import { Logo, LogoTypes } from '../../atoms/Icon/Logo'
import { BasicInput } from '../../atoms/Input/BasicInput'
import { UnitInput } from '../../atoms/Input/UnitInput'
import CustomOption from '../../atoms/Option/CustomOption'

import EthAddress from '~/stories/utils/Ethereum/EthAddress'
import Spacer from '~/utils/Spacer'

const SendFundsTxDetails: React.FC<Props> = ({ isOpen, onClose }) => {
  const ethAddress = '0xfF501B324DC6d78dC9F983f140B9211c3EdB4dc7'
  const [selectToken, setSelectToken] = useState('Eth')

  const tokens = [
    {
      value: 'ethereum',
      label: 'Ethereum',
      id: 'eth',
    },
    {
      value: 'dai',
      label: 'Dai',
      id: 'dai',
    },
    {
      value: 'usdc',
      label: 'USDC',
      id: 'usdc',
    },
    {
      value: 'bnb',
      label: 'BNB Binance',
      id: 'bnb',
    },
  ]

  const schema = z.object({
    recipientAddress: z
      .string()
      .min(1, { message: 'Owner address is required' }),
    sendingAmount: z
      .number({
        required_error: 'Amount is required',
        invalid_type_error: 'Amount must be a number',
      })
      .nonnegative()
      .gt(0),
    selectedToken: z.string(),
  })

  const methods = useForm({
    defaultValues: {
      recipientAddress: '',
      selectedToken: tokens[0].value,
      sendingAmount: 0,
    },
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: any) => console.log(data)
  const onError = (errors: any, e: any) => console.log('Error:', errors, e)

  const handleSelectToken = (e: any) => {
    const currentToken = tokens.filter(
      (token) => token.value === e.target.value
    )
    const selectedTokenId = currentToken[0].id
    console.log(
      selectedTokenId.charAt(0).toUpperCase() + selectedTokenId.slice(1)
    )
    setSelectToken(
      selectedTokenId.charAt(0).toUpperCase() + selectedTokenId.slice(1)
    )
  }

  return (
    <div className='flex flex-col justify-center items-center text-textWhite'>
      <div className='rounded-2xl bg-bgDarkLight p-4'>
        <span>Sending from</span>
        <Spacer size={16} axis={'vertical'} />
        <EthAddress
          ethAddress={ethAddress}
          size={4.5}
          length={'full'}
          walletName={'My wallet'}
        />
        <Spacer size={8} axis={'vertical'} />
        <div className='flex flex-row items-center'>
          <span className='rounded-lg bg-light px-2 mr-2'>Balance</span>
          <span>0.080</span>
          <span className='ml-2'>ETH</span>
        </div>
      </div>

      <Spacer size={16} axis={'vertical'} />
      <Icon type={'ArrowNarrowDown'} size={'5xl'} color={'white'} />
      <Spacer size={16} axis={'vertical'} />
      <div className='w-full'>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
            <div className='rounded-2xl bg-bgDarkLight p-4 w-full'>
              <span>Recipient</span>
              <Spacer size={16} axis={'vertical'} />

              <BasicInput
                label='Recipient address'
                placeholder='0xfF0000000000000000000000000000000000*'
                type='text'
                registeredName={'recipientAddress'}
              />

              <Spacer size={8} axis={'vertical'} />

              <div className='flex flex-col'>
                <label className='text-sm text-textGrayLight'>
                  Select Token
                </label>
                <div className='flex flex-row justify-center items-center'>
                  <Logo type={`${selectToken}Logo` as LogoTypes} size={'xxl'} />
                  <Spacer size={8} axis={'horizontal'} />
                  <CustomOption
                    options={tokens}
                    size='lg'
                    registeredName={'selectedToken'}
                    handleChange={handleSelectToken}
                  />
                </div>
              </div>

              <Spacer size={8} axis={'vertical'} />

              <UnitInput
                label='Amount you want to send'
                placeholder='Amount*'
                type='text'
                registeredName={'sendingAmount'}
                unit={selectToken.toUpperCase()}
              />
            </div>

            <Spacer size={32} axis={'vertical'} />
            <div className='flex flex-row justify-between'>
              <Button
                btnVariant={'text'}
                btnSize={'lg'}
                btnType={'button'}
                handleClick={() => {
                  onClose()
                }}
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
    </div>
  )
}

type Props = {
  isOpen: boolean | undefined
  onClose: () => void
}

const ReceiveFundsModal: React.FC<Props> = ({ isOpen, onClose }) => {
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
                Send Funds (1/2)
              </span>

              <Dialog.Description className='py-6'>
                {/* Description */}
                <SendFundsTxDetails isOpen={isOpen} onClose={onClose} />
                {/* Description */}
              </Dialog.Description>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </>
  )
}

export default ReceiveFundsModal
