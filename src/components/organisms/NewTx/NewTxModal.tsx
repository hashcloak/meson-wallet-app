import { Dialog } from '@headlessui/react';
import { useSelector } from 'react-redux';
import Button from '~/components/atoms/Button/Button';
import { StatusIcon } from '~/components/atoms/Icon';
import EthAddress from '~/utils/Ethereum/EthAddress';
import Spacer from '~/utils/Spacer';
import Portfolio from '../Portfolio';
import { MesonWalletState } from '~/features/mesonWallet';
import { RootState } from '~/features/reducers';

export type ModalProps = {
  isOpen?: boolean;
  onCloseNewTxModal: () => void;
  isOpenReceiveFundsModal: boolean;
  handleReceiveFundsModal: () => void;
  isOpenSendFundsModal: boolean;
  handleSendFundsModal: () => void;
};

const NewTxDetails: React.FC<ModalProps> = ({
  onCloseNewTxModal,
  handleReceiveFundsModal,
  handleSendFundsModal,
}) => {
  const { walletName, mesonWallet } = useSelector<RootState, MesonWalletState>(
    (state) => state.mesonWallet
  );

  return (
    <div className='flex flex-col text-textWhite'>
      <div className='py-4 px-8 rounded-2xl bg-bgDarkLight'>
        <Spacer size={8} axis={'vertical'} />

        <EthAddress
          ethAddress={mesonWallet ? mesonWallet.mesonWalletAddress : ''}
          size={0}
          length={'full'}
          walletName={walletName}
        />

        <Spacer size={16} axis={'vertical'} />

        <div className='flex flex-row justify-around'>
          <Button
            btnVariant={'primary'}
            btnSize={'lg'}
            btnType={'button'}
            handleClick={() => {
              onCloseNewTxModal();
              handleSendFundsModal();
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
              onCloseNewTxModal();
              handleReceiveFundsModal();
            }}
          >
            <StatusIcon type={'Receive'} color={'white'} size={'xl'} />
            <span className='text-lg ml-2'>Receive</span>
          </Button>
        </div>
      </div>
      <Spacer size={16} axis={'vertical'} />

      <Portfolio background={'bg-bgDarkLight'} />
    </div>
  );
};

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
      {(isOpen ?? false) && (
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
              <span className='text-textWhite text-2xl font-bold'>
                New transaction
              </span>

              <NewTxDetails
                isOpen={isOpen}
                onCloseNewTxModal={onCloseNewTxModal}
                isOpenReceiveFundsModal={isOpenReceiveFundsModal}
                handleReceiveFundsModal={handleReceiveFundsModal}
                isOpenSendFundsModal={isOpenSendFundsModal}
                handleSendFundsModal={handleSendFundsModal}
              />
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default NewTxModal;
