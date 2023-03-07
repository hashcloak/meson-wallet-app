import Button from '../../atoms/Button/Button'

import EthAddress from '~/stories/utils/Ethereum/EthAddress'
import StepContentLayout from '~/stories/utils/Layout/StepContentLayout'
import StepWrapper from '~/stories/utils/Layout/StepWrapper'
import Spacer from '~/utils/Spacer'

type Props = {
  isCreateNew?: boolean
}

const WalletReview: React.FC<Props> = ({ isCreateNew = true }) => {
  const defaultAddress = '0xfF501B324DC6d78dC9F983f140B9211c3EdB4dc7'

  const handleSubmit = () => console.log('submit')

  return (
    <div className='flex flex-col justify-center items-center w-full h-full box-border'>
      <div>
        <span className='text-textWhite text-2xl font-bold'>③ Review</span>
        <form onSubmit={handleSubmit} className='w-[60rem]'>
          <StepWrapper>
            {/* 1st row */}
            <StepContentLayout cols={'6'} gap={'5'}>
              <div className='col-span-2 flex flex-col text-textWhite text-base max-w-[35rem]'>
                <span className='text-xl underline'>Wallet details</span>
                <Spacer size={8} axis={'vertical'} />
                <div className='pl-4'>
                  <div className='flex flex-col mb-2'>
                    <span className='text-sm text-textGrayLight'>
                      Name of the Meson Wallet
                    </span>
                    <span className='text-lg text-textWhite'>
                      Sample wallet
                    </span>
                  </div>
                  <div className='flex flex-col mb-2'>
                    <span className='text-sm text-textGrayLight'>
                      Selected network
                    </span>
                    <span className='text-lg text-textWhite'>Ethereum</span>
                  </div>
                </div>
              </div>

              <div className='col-span-4 flex flex-col text-textWhite text-base max-w-[35rem]'>
                <span className='text-xl underline'>Owners</span>
                <Spacer size={8} axis={'vertical'} />
                <div className='pl-4'>
                  {/* Owners */}
                  <div className='flex flex-col mb-2'>
                    <EthAddress
                      ethAddress={defaultAddress}
                      size={4.5}
                      length={'full'}
                      icons={true}
                    />
                  </div>
                  <div className='flex flex-col mb-2'>
                    <EthAddress
                      ethAddress={defaultAddress}
                      size={4.5}
                      length={'full'}
                      icons={true}
                    />
                  </div>

                  {/* Confirmation */}
                  <div className='flex flex-col mb-2'>
                    <span className='text-sm text-textGrayLight'>
                      Required confirmation
                    </span>
                    <span className='text-lg text-textWhite pl-2'>
                      1 out of 2 owners
                    </span>
                  </div>
                </div>
              </div>
              {isCreateNew ? (
                <div className='bg-bgDarkLight w-[56rem] py-4 mt-6 rounded-2xl flex flex-col items-center text-textWhite'>
                  <div className='flex flex-col'>
                    <span>
                      ※ You&apos;re almost creating a new Meson Wallet on{' '}
                      <span className='font-bold text-warning'>Ethereum</span>.{' '}
                    </span>
                    <span>
                      ・You will have to confirm a transaction with your
                      currently connected wallet.{' '}
                    </span>
                    <span>
                      ・The creation will cost approximately{' '}
                      <span className='font-bold'>0.02145</span> ETH, thus make
                      sure your connected wallet has enough token.{' '}
                    </span>
                    <span>
                      (The exact amount will be determined by your wallet.){' '}
                    </span>
                  </div>
                </div>
              ) : null}
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
              <Button btnVariant={'primary'} btnSize={'lg'} btnType={'submit'}>
                Next
              </Button>
            </StepContentLayout>
          </StepWrapper>
        </form>
      </div>
    </div>
  )
}

export default WalletReview
