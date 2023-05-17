import { zodResolver } from '@hookform/resolvers/zod'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { NewOwnerType } from '.'
import { Button } from '@/components/atoms/Button'
import OptionControl, { Options } from '@/components/atoms/Option/OptionControl'
import Spinner from '@/components/atoms/Spinner'
import NewOwnerInput from '@/components/molecules/NewOwnerInput'
import { mockOwners } from '@/utils/Mock'
import Spacer from '@/utils/Spacer'

type SwitchSignerDetailType = {
  onClose: () => void
}

const SwitchSignerDetail: React.FC<SwitchSignerDetailType> = ({ onClose }) => {
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
  const [trezorFullAccounts, setTrezorFullAccounts] = useState<any>(trezorAccounts)
  const [isLoading, setIsLoading] = useState(false)
  const [primarySignerAddress, setPrimarySignerAddress] = useState(currentAddress)

  useEffect(() => {
    setIsLoading(!isLoading)
    const data = async () => {
      const network = 'mainnet'
      const provider = ethers.getDefaultProvider(network, {
        etherscan: process.env.NEXT_PUBLIC_ETHERSCAN_API,
        infura: process.env.NEXT_PUBLIC_INFURA_API,
      })
      const updateAccounts = await Promise.all(
        trezorAccounts.map(async (account) => {
          const balance = await provider.getBalance(account.address)
          const balanceInEth = ethers.utils.formatEther(balance)
          const fullAccount = {
            serializedPath: account.serializedPath,
            address: account.address,
            balance: balanceInEth,
          }
          return fullAccount
        }),
      )
      setTrezorFullAccounts(updateAccounts)
      setIsLoading(false)
    }
    data()
  }, [])

  const handleSwitch = () => {
    console.log('Switch signer to: ', primarySignerAddress)
    onClose()
  }

  return (
    <div className='flex flex-col text-textWhite'>
      <span className='text-lg'>Current signer</span>
      <div className=' bg-bgDarkLight p-4 rounded-2xl'>
        <div className='grid grid-cols-2 gap-x-8 box-border w-full p-2'>
          <div className='grid grid-cols-1 text-textGrayLight'>
            <span className='col-span-1'>Address</span>
          </div>
          <div className='grid grid-cols-3 gap-x-8 text-textGrayLight'>
            <span className='col-span-1'>Path</span>
            <span className='col-span-2'>Asset</span>
          </div>

          <div className='grid grid-cols-1'>
            <span className='col-span-1'>{currentAddress}</span>
          </div>
          <div className='grid grid-cols-3 gap-x-8'>
            <span className='col-span-1'>{currentPath}</span>
            <span className='col-span-2'>{currentAsset}</span>
          </div>
        </div>
      </div>

      <Spacer size={32} axis={'vertical'} />

      <span className='text-lg'>Available signers</span>
      <div className='bg-bgDarkLight p-4 rounded-2xl flex flex-col'>
        {isLoading ? (
          <div className='w-full h-full self-center'>
            <Spinner />
          </div>
        ) : (
          <div className='box-border w-full'>
            <div className='grid grid-cols-2 gap-x-8 box-border w-full px-2'>
              <div className='grid grid-cols-1 text-textGrayLight'>
                <span className='col-span-1'>Address</span>
              </div>
              <div className='grid grid-cols-3 gap-x-8 text-textGrayLight'>
                <span className='col-span-1'>Path</span>
                <span className='col-span-2'>Asset</span>
              </div>
            </div>

            {trezorFullAccounts.map((account: any) => (
              <div
                className={`grid grid-cols-2 gap-x-8 box-border rounded-xl hover:bg-dark w-full p-2 ${
                  account.address == primarySignerAddress ? 'bg-dark' : ''
                }`}
                key={account.address}
                onClick={() => setPrimarySignerAddress(account.address)}
                role='button'
              >
                <div className='grid grid-cols-1'>
                  <span className='col-span-1'>{account.address}</span>
                </div>
                <div className='grid grid-cols-3 gap-x-8'>
                  <span className='col-span-1'>{account.serializedPath}</span>
                  <span className='col-span-2'>{account.balance} ETH</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Spacer size={32} axis={'vertical'} />
      <div className='flex flex-row justify-around'>
        <Button btnVariant={'text'} btnSize={'lg'} btnType={'button'} handleClick={onClose}>
          <span className='text-lg'>Cancel</span>
        </Button>
        <Button
          btnVariant={currentAddress == primarySignerAddress ? 'disable' : 'primary'}
          btnSize={'lg'}
          btnType={'submit'}
          handleClick={handleSwitch}
          disabled={currentAddress == primarySignerAddress}
        >
          Switch
        </Button>
      </div>
    </div>
  )
}

export default SwitchSignerDetail
