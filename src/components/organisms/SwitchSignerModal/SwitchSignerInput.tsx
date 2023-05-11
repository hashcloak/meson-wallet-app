import { zodResolver } from '@hookform/resolvers/zod'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { NewOwnerType } from '.'
import { Button } from '@/components/atoms/Button'
import OptionControl, { Options } from '@/components/atoms/Option/OptionControl'
import NewOwnerInput from '@/components/molecules/NewOwnerInput'
import { mockOwners } from '@/utils/Mock'
import Spacer from '@/utils/Spacer'

type SwitchSignerInputType = {
  onClose: () => void
  onPageChange: () => void
  onSetNewOwner: (data: NewOwnerType) => void
}

const SwitchSignerInput: React.FC<SwitchSignerInputType> = ({
  onClose,
  onPageChange,
  onSetNewOwner,
}) => {
  const [numOfConfirmation, setNumOfConfirmation] = useState<Options[]>([])

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
    newOwnerAddress: z.string().min(1, { message: 'Owner Address is required' }),
    confirmation: z.string(),
  })

  const methods = useForm({
    defaultValues: {
      newOwnerName: '',
      newOwnerAddress: '',
      confirmation: '1',
    },
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: any) => {
    onSetNewOwner(data)
    onPageChange && onPageChange()
  }

  const onError = (errors: any, e: any) => console.log('Error:', errors, e)

  useEffect(() => {
    const fields = [...mockOwners]
    fields.push({ address: '', name: '' })

    const numOfOwners: Options[] = fields.map((_, index) => {
      return {
        value: String(index + 1),
        label: String(index + 1),
        bg: 'bg-bgGray text-textBlack',
      }
    })
    setNumOfConfirmation(numOfOwners)
  }, [])

  const currentAddress = '0xfF501B324DC6d78dC9F983f140B9211c3EdB4dc7'
  const currentPath = "m/44'/60'/0'/0/0"
  const currentAsset = '100 ETH'
  const trezorAccounts = [
    {
      serializedPath: "m/44'/60'/0'/0/1",
      address: '0xd3dDC85bDc627D979A18607e4323eEAF75cDeB5F',
    },
    {
      serializedPath: "m/44'/60'/0'/0/2",
      address: '0x033d1c7f7147A9109C2b758F09c2b9B258cfF063',
    },
    {
      serializedPath: "m/44'/60'/0'/0/3",
      address: '0x9d15bc47B6c2db762f191E370e4Af5B1f2914AD0',
    },
    {
      serializedPath: "m/44'/60'/0'/0/4",
      address: '0x52411Da3aB0F1268b11160E342D27A5167e1729C',
    },
    {
      serializedPath: "m/44'/60'/0'/0/5",
      address: '0x12fdE4B42d1183120233c4862630A33d36dD45a4',
    },
  ]
  const [trezorFullAccounts, setTrezorFullAccounts] = useState<any>([])

  useEffect(() => {
    const data = async () => {
      const network = 'mainnet'
      const provider = ethers.getDefaultProvider(network)
      const updateAccounts = trezorAccounts.map(async (account) => {
        const balance = await provider.getBalance(account.address)
        const balanceInEth = ethers.utils.formatEther(balance)
        const fullAccount = {
          serializedPath: account.serializedPath,
          address: account.address,
          balance: balance,
        }
        console.log(`balance: ${balanceInEth} ETH`)
        return fullAccount
      })
      setTrezorFullAccounts(updateAccounts)
    }
    data()
    console.log(trezorFullAccounts)
  }, [])

  return (
    <div className='flex flex-col text-textWhite'>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
          <span className='text-lg'>Current signer</span>
          <div className=' bg-bgDarkLight p-4 rounded-2xl'>
            <div className='grid grid-cols-2 gap-x-8 box-border w-full'>
              <div className='grid grid-cols-1 text-textGrayLight'>
                <span className='col-span-1'>Address</span>
              </div>
              <div className='grid grid-cols-2 text-textGrayLight'>
                <span className='col-span-1'>Path</span>
                <span className='col-span-1'>Asset</span>
              </div>

              <div className='grid grid-cols-1'>
                <span className='col-span-1'>{currentAddress}</span>
              </div>
              <div className='grid grid-cols-2'>
                <span className='col-span-1'>{currentPath}</span>
                <span className='col-span-1'>{currentAsset}</span>
              </div>
            </div>
          </div>

          <Spacer size={32} axis={'vertical'} />

          <span className='text-lg'>Available signers</span>
          <div className='bg-bgDarkLight p-4 rounded-2xl flex flex-col'>
            <div className='grid grid-cols-2 gap-x-8 box-border w-full'>
              <div className='grid grid-cols-1 text-textGrayLight'>
                <span className='col-span-1'>Address</span>
              </div>
              <div className='grid grid-cols-2 text-textGrayLight'>
                <span className='col-span-1'>Path</span>
                <span className='col-span-1'>Asset</span>
              </div>
              {trezorFullAccounts.map((account: any) => (
                <>
                  <div className='grid grid-cols-1' key={account.address}>
                    <span className='col-span-1'>{account.address}</span>
                  </div>
                  <div className='grid grid-cols-2'>
                    <span className='col-span-1'>{account.serializedPath}</span>
                    <span className='col-span-1'>{account.balance}</span>
                  </div>
                </>
              ))}
            </div>
          </div>

          <Spacer size={32} axis={'vertical'} />
          <div className='flex flex-row justify-around'>
            <Button btnVariant={'text'} btnSize={'lg'} btnType={'button'} handleClick={onClose}>
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

export default SwitchSignerInput
