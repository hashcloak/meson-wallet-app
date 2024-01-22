/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { Icon, Logo } from '~/components/atoms/Icon';
import { LogoTypes } from '~/components/atoms/Icon/Logo';
import { EthAddress } from '~/utils/Ethereum';
import Spacer from '~/utils/Spacer';
import { TxStatus } from '../IconText';
import TxModal from '../Modal/TxModal';
import { ExtendedTransactionResponse } from '~/features/historicalTxs';
import { useConvertTx } from '~/hooks/useConvertTx';
import { unixTimeConverter } from '~/utils/unixTimeConverter';

type TokensType = {
  [key: string]: { token: string; logo: LogoTypes };
};

const tokens: TokensType = {
  Eth: { token: 'ETH', logo: 'EthLogo' },
};

type Props = {
  tx: ExtendedTransactionResponse;
};

// TODO: The temp props is applied, it needs to be updated.
const Card: React.FC<Props> = ({ tx }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(!isOpen);
  const convertedTx = useConvertTx(tx);
  const { status, token, value, timestamp, to, from } = convertedTx;
  const { date, time } = unixTimeConverter(Number(timestamp));
  const tokenLogo = token !== '' ? tokens[token].logo : 'na';

  let relatedAddress;
  switch (status) {
    case 'Send' || 'Sent':
      relatedAddress = (
        <>
          <span className='text-sm text-textWhite text-left w-full'>To:</span>
          <span className='flex flex-row items-center'>
            <EthAddress
              ethAddress={to ?? ''}
              size={2}
              length={'short'}
              icons={false}
            />
          </span>
        </>
      );
      break;
    case 'Received':
      relatedAddress = (
        <>
          <span className='text-sm text-textWhite text-left w-full'>From:</span>
          <span className='flex flex-row items-center'>
            <EthAddress
              ethAddress={from}
              size={2}
              length={'short'}
              icons={false}
            />
          </span>
        </>
      );
      break;
    case 'AccountCreated':
      relatedAddress = (
        <>
          <span className='text-sm text-textWhite text-left w-full'>
            Creator:
          </span>
          <span className='flex flex-row items-center'>
            <EthAddress
              ethAddress={from}
              size={2}
              length={'short'}
              icons={false}
            />
          </span>
        </>
      );
      break;
  }

  return (
    <>
      <div className="flex justify-center items-center h-[18rem] after:w-[4rem] after:border-t-2 after:border-borderGray after:content-['']">
        <div className='w-full h-full flex justify-center items-start'>
          <span className='relative w-[12.5rem] text-center'>
            <span className='text-sm font-bold text-textWhite'>{date}</span>
            <br />
            <span className='text-sm text-textWhite'>{time}</span>
            <div className='w-full flex justify-center'>
                <Icon type={'CheckCircle'} size={'xl'} color={'main'} />
            </div>
            <div
              className="
  w-[12.5rem]
  h-[13rem]
  rounded-2xl
  dark:bg-bgDarkLight
  bg-bgGrayLight
  p-4
  text-white
  absolute
  -bottom-[14.5rem]
  left-1/2
  -translate-x-1/2
  after:content-['']
  after:absolute
  after:-translate-x-1/2
  after:left-1/2
  after:rotate-180
  after:bottom-full
  after:border-[1rem]
  after:border-transparent
  after:border-t-bgDarkLight
  hover:bg-dark
  "
              onClick={onClose}
              role='button'
              tabIndex={0}
            >
              <span className='flex flex-col justify-center items-center h-2/3'>
                <span className='flex flex-row justify-center items-center'>
                  <TxStatus
                    type={status}
                    size={'xl'}
                    color={'white'}
                    status={status}
                  />
                </span>
                {status.toString() === 'OwnerChange' ||
                status.toString() === 'OnChainRejection' ? null : (
                  <>
                    <Spacer size={8} axis={'vertical'} />
                    {tokenLogo !== 'na' ? (
                      <Logo type={tokenLogo} size={'xl'} />
                    ) : (
                      'N/A'
                    )}
                    <Spacer size={8} axis={'vertical'} />
                    <span className='text-lg text-textWhite font-bold'>
                      {status === 'Send' || status === 'Sent' ? <>-</> : null}{' '}
                      {String(value)} {token.toUpperCase()}
                    </span>
                  </>
                )}
              </span>
              <Spacer size={8} axis={'vertical'} />
              <span className='flex flex-col justify-center items-center border-t-2 border-solid border-borderGray pt-2 h-1/3'>
                {relatedAddress}
              </span>
            </div>
            {/* TODO: Need to edit props after deciding the tx's data structure */}
            <TxModal isOpen={isOpen} onClose={onClose} tx={convertedTx} />
          </span>
        </div>
      </div>
    </>
  );
};

export default Card;
