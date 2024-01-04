import React from 'react';
import { Dialog } from '@headlessui/react';
import { ethers } from 'ethers';
import { useSelector } from 'react-redux';
import { Button } from '~/components/atoms/Button';
import { Icon } from '~/components/atoms/Icon';
import { RowBodyLong } from '~/components/organisms/RowBody';
import EthAddress from '~/utils/Ethereum/EthAddress';
import Spacer from '~/utils/Spacer';
import { MesonWalletState } from '~/features/mesonWallet';
import { RootState } from '~/features/reducers';
import { SignerState } from '~/features/signerWallet';
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
  const { date, time } = unixTimeConverter(tx.timestamp ?? 0);
  const { signerWalletAddress } = useSelector<RootState, SignerState>(
    (state) => state.signerWallet
  );
  const { confirmation, owners } = useSelector<RootState, MesonWalletState>(
    (state) => state.mesonWallet
  );

  let content;
  if (tx.status === 'AccountCreated') {
    content = (
      <>
        <span className='text-textWhite font-bold'>Creator:</span>
        <div className='flex flex-row items-center pl-6 mt-2'>
          <EthAddress
            ethAddress={signerWalletAddress}
            size={4.5}
            length='full'
          />
        </div>
        <span className='text-textWhite font-bold  mt-4'>Factory:</span>
        <div className='flex flex-row items-center pl-6 mt-2'>
          <EthAddress
            ethAddress={tx.to ?? ''}
            size={4.5}
            length='full'
          />
        </div>
        <Spacer size={32} axis={'vertical'} />
        <div className='text-textWhite'>
          <div className='grid grid-cols-[20%_1fr]'>
            <div className='font-bold text-sm flex flex-col'>
              <span>Tx Hash</span>
              <span>Created</span>
            </div>
            <div className='text-sm flex flex-col'>
              <span>{tx.hash ? tx.hash : 'n/a'}</span>
              <span>{`${date}, ${time}`}</span>
            </div>
          </div>
        </div>
      </>
    );
  } else if (tx.status === 'Sent' || tx.status === 'Send') {
    content = (
      <>
        {' '}
        <div>
          <span className='text-textWhite'>
            {tx.status}{' '}
            <span className='font-bold'>
              {String(tx.value)} {tx.token?.toUpperCase()}
            </span>{' '}
            {tx.status === 'Sent' ? 'to:' : 'from:'}
          </span>
          <div className='flex flex-row items-center pl-6 mt-2'>
            <EthAddress
              ethAddress={tx.status === 'Sent' ? (tx.to ?? '') : tx.from}
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
              <span>{(tx.gasPrice).toString()} wei</span>
              <span>0x00000000...00000000</span>
              <span>65 bytes</span>
            </div>
          </div>
        </div>
      </>
    );
  } else if (tx.status === 'Received') {
    content = (
      <>
        <div>
          <span className='text-textWhite'>
            {tx.status}{' '}
            <span className='font-bold'>
              {String(tx.value)} {tx.token?.toUpperCase()}
            </span>{' '}
            from:
          </span>
          <div className='flex flex-row items-center pl-6 mt-2'>
            <EthAddress ethAddress={tx.from} size={4.5} length='full' />
          </div>
        </div>
        <Spacer size={32} axis={'vertical'} />
        <div className='text-textWhite'>
          <div className='grid grid-cols-[20%_1fr]'>
            <div className='font-bold text-sm flex flex-col'>
              <span>Tx Hash</span>
              <span>Created</span>
            </div>
            <div className='text-sm flex flex-col'>
              <span>{tx.hash ? tx.hash : 'n/a'}</span>
              <span>{`${date}, ${time}`}</span>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className='flex flex-row justify-between w-full max-w-[79.875rem]'>
        {/* Left content */}
        <div className='flex flex-col'>{content}</div>

        <Spacer size={48} axis={'horizontal'} />

        <div className='flex flex-col justify-start'>
          {tx.status === 'AccountCreated' || tx.status === 'Received'
            ? null
            : owners?.map((owner) => (
                <>
                  <div className='flex flex-row mb-2' key={owner.ownerAddress}>
                    <Icon type={'CheckCircle'} size={'lg'} color={'main'} />
                    <span className='text-main font-bold ml-2'>Created</span>
                  </div>
                  <div className='flex flex-col mb-2'>
                    <div className='flex flex-row'>
                      <Icon type={'CheckCircle'} size={'lg'} color={'main'} />

                      <span className='text-main font-bold ml-2'>
                        Confirmed
                        <span className='text-textWhite text-sm font-normal ml-2'>
                          ({tx.confirmations} of {confirmation})
                        </span>
                      </span>
                    </div>
                    <div className='flex flex-row items-center pl-6 mt-2'>
                      <EthAddress
                        ethAddress={signerWalletAddress}
                        size={4.5}
                        length='short'
                      />
                    </div>
                  </div>
                  {(tx.confirmations - tx.confirmations) === 0 ? (
                  <div className='flex flex-col mb-2'>
                  <div className='flex flex-row'>
                    <Icon type={'CheckCircle'} size={'lg'} color={'white'} />
                    <span className='text-textWhite font-bold ml-2'>
                      Executed
                    </span>
                  </div>
                </div>
                  ):(
                  <>
                  <div className='flex flex-col mb-2'>
                    <div className='flex flex-row'>
                      <Icon type={'Circle'} size={'lg'} color={'white'} />
                      <span className='text-textWhite font-bold ml-2'>
                        Execution
                      </span>
                    </div>

                    <span className='text-textWhite text-sm font-normal pl-6'>
                      Can be executed once the threshold is reached
                    </span>
                  </div>
                  <div className='flex flex-row justify-around mt-6'>
                    <Button
                      btnVariant={'primary'}
                      btnSize={'md'}
                      btnType={'button'}
                    >
                      Confirm
                    </Button>
                    <Button
                      btnVariant={'alert'}
                      btnSize={'md'}
                      btnType={'button'}
                    >
                      Reject
                    </Button>
                  </div>
                  </>
                  )}
                </>
              ))}
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

              <div className='p-6'>
                {/* Description */}
                <TxContents tx={tx} />
                {/* Description */}
              </div>
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
