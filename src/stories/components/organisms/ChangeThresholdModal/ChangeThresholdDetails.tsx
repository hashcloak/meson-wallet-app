import Button from '../../atoms/Button/Button'
import { OwnerType } from '../EditOwners/EditOwners'

import EthAddress from '~/stories/utils/Ethereum/EthAddress'
import { mockOwners } from '~/stories/utils/Mock'
import Spacer from '~/utils/Spacer'

type ChangeThresholdDetailsProps = {
  confirmation: string
  onClose: () => void
  onPageChange: () => void
  onLoad: () => void
}

const ChangeThresholdDetails: React.FC<ChangeThresholdDetailsProps> = ({
  onClose,
  confirmation,
  onPageChange,
  onLoad,
}) => {
  return (
    <>
      <div className='grid grid-cols-[30%_1fr] gap-5 rounded-2xl bg-bgDarkLight p-4 text-textWhite text-base'>
        <div className='flex flex-col w-full'>
          <span className='text-xl underline'>Details</span>
          <Spacer size={8} axis={'vertical'} />
          <div className='pl-2'>
            <div className='flex flex-col mb-2'>
              <span className='text-sm text-textGrayLight'>
                Name of the Meson Wallet
              </span>
              <span className='text-lg text-textWhite'>Sample wallet</span>
            </div>
            <div className='flex flex-col mb-2'>
              <span className='text-sm text-textGrayLight'>
                Address of the Meson Wallet
              </span>
              <EthAddress
                ethAddress={'0xf86B25473cC08F04DA275B2847F2448cf041Fbd5'}
                size={4.5}
                length={'short'}
              />
            </div>
            <div className='flex flex-col mb-2'>
              <span className='text-sm text-textGrayLight'>
                Selected network
              </span>
              <span className='text-lg text-textWhite'>Ethereum</span>
            </div>
            <div className='flex flex-col p-2 mb-2 bg-[#397F97] rounded-2xl h-[4rem]'>
              <span className='text-sm text-textGrayLight'>
                Required confirmation
              </span>
              <span className='text-lg text-textWhite'>
                {confirmation} out of {mockOwners.length} owners
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
          </div>
        </div>
      </div>
      <Spacer size={16} axis={'vertical'} />
      <div
        tabIndex={0}
        className='collapse collapse-arrow border border-base-300 bg-base-100 rounded-box'
      >
        <div className='collapse-title text-base font-bold bg-bgDarkLight'>
          Advanced parameters
        </div>
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
        <Button
          btnVariant={'text'}
          btnSize={'lg'}
          btnType={'button'}
          // handleClick={onPageChange}
          handleClick={() => {
            onPageChange()
            onClose()
          }}
        >
          <span className='text-lg'>Back</span>
        </Button>
        <Button
          btnVariant={'primary'}
          btnSize={'lg'}
          btnType={'button'}
          handleClick={onLoad}
        >
          Submit
        </Button>
      </div>
    </>
  )
}

export default ChangeThresholdDetails
