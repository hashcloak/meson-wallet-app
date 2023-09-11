import React from 'react';
import { Dialog } from '@headlessui/react';
import { Button } from '~/components/atoms/Button';
import { Icon } from '~/components/atoms/Icon';
import { RowBodyLong } from '~/components/organisms/RowBody';
import EthAddress from '~/utils/Ethereum/EthAddress';
import Spacer from '~/utils/Spacer';
import { TxType } from '~/hooks/useConvertTx';
import { unixTimeConverter } from '~/utils/unixTimeConverter';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  tx?: TxType;
};

export const TxContents: React.FC<{
  tx: TxType;
}> = ({ tx }) => {
  const { date, time } = unixTimeConverter(tx.timeStamp);

  return (
    <>
      <div className='flex flex-row justify-between w-full'>
        {/* Left content */}
        <div className='flex flex-col'>
          <div>
            <span className='text-textWhite'>
              {tx.status}{' '}
              <span className='font-bold'>
                {tx.value} {tx.token?.toUpperCase()}
              </span>{' '}
              {tx.status === 'Sent' ? 'to:' : 'from:'}
            </span>
            <div className='flex flex-row items-center pl-6 mt-2'>
              <EthAddress
                ethAddress={tx.status === 'Sent' ? tx.to : tx.from}
                size={4.5}
                length='full'
              />
            </div>
          </div>

          <Spacer size={32} axis={'vertical'} />
          <div className='text-textWhite'>
            <div className='grid grid-cols-[20%_1fr]'>
              <div className='font-bold text-sm flex flex-col'>
                <span>Tx Hash</span>
                <span>Created</span>
                <span>Executed</span>
                <Spacer size={16} axis={'vertical'} />
                <span>Operation</span>
                <span>Tx Gas</span>
                <span>BaseGas</span>
                <span>Gas Price</span>
                <span>Gas Token</span>
                <span>Signature 1</span>
              </div>
              <div className='text-sm flex flex-col'>
                <span>{tx.hash ? tx.hash : 'n/a'}</span>
                <span>{`${date}, ${time}`}</span>
                <span>{`${date}, ${time}`}</span>
                <Spacer size={16} axis={'vertical'} />
                <span>0 (call)</span>
                <span>{tx.gasUsed} wei</span>
                <span>{tx.gas} wei</span>
                <span>{tx.gasPrice} wei</span>
                <span>0x00000000...00000000</span>
                <span>65 bytes</span>
              </div>
            </div>
          </div>
        </div>
        <Spacer size={48} axis={'horizontal'} />

        <div className='flex flex-col justify-start'>
          <div className='flex flex-row mb-2'>
            <Icon type={'CheckCircle'} size={'lg'} color={'main'} />
            <span className='text-main font-bold ml-2'>Created</span>
          </div>

          <div className='flex flex-col mb-2'>
            <div className='flex flex-row'>
              <Icon type={'CheckCircle'} size={'lg'} color={'main'} />

              <span className='text-main font-bold ml-2'>
                Confirmed
                <span className='text-textWhite text-sm font-normal ml-2'>
                  (1 of 2)
                </span>
              </span>
            </div>
            <div className='flex flex-row items-center pl-6 mt-2'>
              <EthAddress
                ethAddress='0xD9Be7c81641BdfC2D82cAC5052455aD5313Ea5DF'
                size={4.5}
                length='full'
              />
            </div>
          </div>

          <div className='flex flex-col mb-2'>
            <div className='flex flex-row'>
              <Icon type={'Circle'} size={'lg'} color={'light'} />
              <span className='text-light font-bold ml-2'>
                Awaiting confirmations
                <span className='text-textWhite text-sm font-normal ml-2'>
                  (1 of 2)
                </span>
              </span>
            </div>

            <div className='flex flex-row items-center pl-6 mt-2'>
              <EthAddress
                ethAddress='0xfF501B324DC6d78dC9F983f140B9211c3EdB4dc7'
                size={4.5}
                length='full'
              />
            </div>
          </div>

          <div className='flex flex-col mb-2'>
            <div className='flex flex-row'>
              <Icon type={'Circle'} size={'lg'} color={'white'} />
              <span className='text-textWhite font-bold ml-2'>Execution</span>
            </div>

            <span className='text-textWhite text-sm font-normal pl-6'>
              Can be executed once the threshold is reached
            </span>
          </div>

          <div className='flex flex-row justify-around mt-6'>
            <Button btnVariant={'primary'} btnSize={'md'} btnType={'button'}>
              Confirm
            </Button>
            <Button btnVariant={'alert'} btnSize={'md'} btnType={'button'}>
              Reject
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

const TxModal: React.FC<Props> = ({ isOpen, onClose, tx }) => {
  if (tx !== undefined) {
    return (
      <>
        <Dialog
          open={isOpen}
          onClose={onClose}
          className='fixed z-10 inset-0 overflow-y-auto'
        >
          <div className='flex items-center justify-center min-h-screen'>
            <Dialog.Overlay
              className='fixed inset-0 bg-neutral-900 opacity-30'
              aria-hidden='true'
            />
            <Dialog.Panel className='relative bg-bgDarkMid rounded-2xl mx-auto'>
              <div className='flex items-center justify-between rounded-t-2xl px-4 h-16 bg-bgDarkLight whitespace-nowrap'>
                <RowBodyLong tx={tx} />
              </div>

              <Dialog.Description className='p-6'>
                {/* Description */}
                <TxContents tx={tx} />
                {/* Description */}
              </Dialog.Description>
            </Dialog.Panel>
          </div>
        </Dialog>
      </>
    );
  } else {
    return <></>;
  }
};

export default TxModal;
