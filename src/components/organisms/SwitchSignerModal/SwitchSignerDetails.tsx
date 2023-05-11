import { OwnerType } from '../EditOwners'

import { NewOwnerType } from '.'

import { Button } from '@/components/atoms/Button'
import { EthAddress } from '@/utils/Ethereum'
import { mockOwners } from '@/utils/Mock'
import Spacer from '@/utils/Spacer'

type SwitchSignerDetailsProps = {
  newOwner: NewOwnerType
  onClose: () => void
}

const SwitchSignerDetails: React.FC<SwitchSignerDetailsProps> = ({ onClose, newOwner }) => {
  return (
    <>
      <div className='grid grid-cols-[30%_1fr] gap-5 rounded-2xl bg-bgDarkLight p-4 w-full  text-textWhite text-base '>
        <div className='flex flex-col w-full'>
          <span className='text-xl underline'>Details</span>
          <Spacer size={8} axis={'vertical'} />
          <div className='pl-2'>
            <div className='flex flex-col mb-2'>
              <span className='text-sm text-textGrayLight'>Name of the Meson Wallet</span>
              <span className='text-lg text-textWhite'>Sample wallet</span>
            </div>
            <div className='flex flex-col mb-2'>
              <span className='text-sm text-textGrayLight'>Address of the Meson Wallet</span>
              <EthAddress
                ethAddress={'0xf86B25473cC08F04DA275B2847F2448cf041Fbd5'}
                size={4.5}
                length={'short'}
              />
            </div>
            <div className='flex flex-col mb-2'>
              <span className='text-sm text-textGrayLight'>Selected network</span>
              <span className='text-lg text-textWhite'>Ethereum</span>
            </div>
            <div className='flex flex-col mb-2'>
              <span className='text-sm text-textGrayLight'>Required confirmation</span>
              <span className='text-lg text-textWhite'>
                {newOwner.confirmation} out of {mockOwners.length + 1} owners
              </span>
            </div>
          </div>
        </div>

        <div className='flex flex-col w-full'>
          <span className='text-xl underline'>Owners</span>
          <Spacer size={8} axis={'vertical'} />
          <div className='pl-2 w-full'>
            {/* Owners */}
            {mockOwners &&
              mockOwners.map((owner: OwnerType) => (
                <EthAddress
                  ethAddress={owner.address}
                  size={4.5}
                  length={'full'}
                  icons={true}
                  walletName={owner.name}
                  key={owner.address}
                />
              ))}

            <Spacer size={8} axis={'vertical'} />

            <div className='flex flex-col justify-center p-2 mb-2 bg-[#397F97] rounded-2xl h-[4.5rem] box-border w-full'>
              <span className='font-bold'>New owner</span>
              <EthAddress
                ethAddress={newOwner && newOwner.newOwnerAddress}
                size={4.5}
                length={'full'}
                icons={true}
                walletName={newOwner?.newOwnerName}
              />
            </div>
          </div>
        </div>
      </div>
      <Spacer size={16} axis={'vertical'} />
      <div
        tabIndex={0}
        className='collapse collapse-arrow border border-base-300 bg-base-100 rounded-box'
      >
        <div className='collapse-title text-base font-bold bg-bgDarkLight'>Advanced parameters</div>
        <div className='collapse-content flex flex-col w-full bg-bgDarkLight'>
          <div className='flex flex-row justify-around w-full'>
            <span>Nonce</span>
            <span>33</span>
          </div>
          <div className='flex flex-row justify-around w-full'>
            <span>TxGas</span>
            <span>43634</span>
          </div>
        </div>
      </div>
      <Spacer size={32} axis={'vertical'} />

      <div className='flex flex-row justify-around'>
        <Button btnVariant={'text'} btnSize={'lg'} btnType={'button'} handleClick={onClose}>
          <span className='text-lg'>Back</span>
        </Button>
        <Button btnVariant={'primary'} btnSize={'lg'} btnType={'submit'}>
          Submit
        </Button>
      </div>
    </>
  )
}

export default SwitchSignerDetails