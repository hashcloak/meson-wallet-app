import { Dialog } from '@headlessui/react'

import Button from '@/components/atoms/Button/Button'

import { StatusIcon } from '@/components/atoms/Icon'
import Token, { TokenTypes } from '@/components/molecules/IconText/Token'
import EthAddress from '@/utils/Ethereum/EthAddress'
import { mockTokensVals } from '@/utils/Mock'
import Spacer from '@/utils/Spacer'

export type ModalProps = {
  isOpen?: boolean
  onCloseNewTxModal: () => void
  isOpenReceiveFundsModal: boolean
  handleReceiveFundsModal: () => void
  isOpenSendFundsModal: boolean
  handleSendFundsModal: () => void
}

const NewTxDetails: React.FC<ModalProps> = ({
  onCloseNewTxModal,
  handleReceiveFundsModal,
  handleSendFundsModal,
}) => {
  return (
    <div className='flex flex-col text-textWhite'>
      <div className='py-4 px-8 rounded-2xl bg-bgDarkLight'>
        <div className='flex flex-col items-center'>
          <span className='text-3xl font-bold'>$ 100.00</span>
          <span className='text-textGrayLight text-sm'>≈ $ 100.00</span>
        </div>
        <Spacer size={8} axis={'vertical'} />

        <EthAddress
          ethAddress={'0xfF501B324DC6d78dC9F983f140B9211c3EdB4dc7'}
          size={0}
          length={'full'}
          walletName={'My wallet'}
        />

        <Spacer size={16} axis={'vertical'} />

        <div className='flex flex-row justify-around'>
          <Button
            btnVariant={'primary'}
            btnSize={'lg'}
            btnType={'button'}
            handleClick={() => {
              onCloseNewTxModal()
              handleSendFundsModal()
            }}
          >
            <StatusIcon type={'Send'} color={'white'} size={'xl'} />
            <Spacer size={8} axis={'horizontal'} />
            <span className='text-lg'>Send</span>
          </Button>

          <Button
            btnVariant={'border'}
            btnSize={'lg'}
            btnType={'button'}
            handleClick={() => {
              onCloseNewTxModal()
              handleReceiveFundsModal()
            }}
          >
            <StatusIcon type={'Receive'} color={'white'} size={'xl'} />
            <span className='text-lg ml-2'>Receive</span>
          </Button>
        </div>
      </div>
      <Spacer size={16} axis={'vertical'} />

      <span className='text-textWhite text-xl font-bold'>Portfolio</span>
      <div className='flex flex-col items-center py-4 px-8 rounded-2xl bg-bgDarkLight'>
        {mockTokensVals.map((token) => (
          <div className='grid grid-cols-8 w-full mb-2' key={token.token}>
            <div className='col-span-2'>
              <Token type={token.type as TokenTypes} abbrev={token.abbrev} token={token.token} />
            </div>
            <div className='col-span-4' />
            <div className='flex flex-col items-start col-span-2'>
              <div className='flex flex-row text-base font-bold'>
                <span>{token.amount}</span>
                <Spacer size={8} axis={'horizontal'} />
                <span>{token.abbrev}</span>
              </div>
              <span className='text-textGrayLight text-sm'>≈ $ 100.00</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const NewTxModal: React.FC<ModalProps> = ({
  isOpen,
  onCloseNewTxModal,
  isOpenReceiveFundsModal,
  handleReceiveFundsModal,
  isOpenSendFundsModal,
  handleSendFundsModal,
}) => {
  return (
    <>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={onCloseNewTxModal}
          className='fixed z-10 inset-0 overflow-y-auto'
          // static
        >
          <div className='flex items-center justify-center min-h-screen'>
            <Dialog.Overlay
              className='fixed inset-0 bg-neutral-900 opacity-30'
              aria-hidden='true'
            />
            <Dialog.Panel className='relative bg-bgDarkMid rounded-2xl py-6 px-8'>
              <span className='text-textWhite text-2xl font-bold'>New transaction</span>

              <Dialog.Description className='p-6'>
                {/* Description */}
                <NewTxDetails
                  isOpen={isOpen}
                  onCloseNewTxModal={onCloseNewTxModal}
                  isOpenReceiveFundsModal={isOpenReceiveFundsModal}
                  handleReceiveFundsModal={handleReceiveFundsModal}
                  isOpenSendFundsModal={isOpenSendFundsModal}
                  handleSendFundsModal={handleSendFundsModal}
                />

                {/* Description */}
              </Dialog.Description>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </>
  )
}

export default NewTxModal
