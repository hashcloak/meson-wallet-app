import { ethers } from 'ethers';
import { Logo } from '~/components/atoms/Icon';
import { LogoTypes } from '~/components/atoms/Icon/Logo';
import { TxStatus } from '~/components/molecules/IconText';
import Spacer from '~/utils/Spacer';
import { TxType } from '~/hooks/useConvertTx';
import { unixTimeConverter } from '~/utils/unixTimeConverter';

type Props = {
  tx: TxType;
};

const RowBodyShort: React.FC<Props> = ({ tx }) => {
  const {
    status,
    token,
    value,
    timestamp,
    to,
    from,
    numOfConfirmation,
  } = tx;
  const { date, time } = unixTimeConverter(Number(timestamp));
  const ethVal = ethers.utils.formatEther(tx.value)

  return (
    <div className='flex flex-row justify-between items-center w-full'>
      <TxStatus type={status} size={'xl'} color={'white'} />
      <Spacer size={16} axis={'horizontal'} />
      <div className='flex flex-col justify-start w-full h-full'>
        {status === 'AccountCreated' ||
        status === 'OwnerChange' ||
        status === 'OnChainRejection' ? (
          <span className='min-w-[20.5rem] font-bold text-lg'>{status}</span>
        ) : (
          <>
            <div className='flex flex-row items-center'>
              <Logo type={`${token}Logo` as LogoTypes} size={'lg'} />
              <Spacer size={8} axis={'horizontal'} />
              <span className='text-textWhite font-bold text-lg'>
                {String(ethVal)} {token?.toUpperCase()}
              </span>
            </div>
            {status === 'Sent' ? (
              <span className='text-textGrayLight text-xs'>To: {to}</span>
            ) : null}
            {status === 'Received' ? (
              <span className='text-textGrayLight text-xs'>From: {from}</span>
            ) : null}
          </>
        )}
      </div>
      <Spacer size={16} axis={'horizontal'} />
      <div className='flex flex-col items-start w-full h-full'>
        <span className='text-textWhite text-sm'>{date}</span>
        <span className='text-textGrayLight text-xs'>{time}</span>
      </div>
      <Spacer size={16} axis={'horizontal'} />
      <div className='flex flex-col items-start w-full h-full'>
        {numOfConfirmation > 0 ? (
          <>
            <span className='text-textWhite text-sm'>Needs confirmation</span>
            <span className='text-textGrayLight text-xs'>
              {numOfConfirmation} out of 2
            </span>
          </>
        ) : (
          <span className='text-textWhite text-sm'>Success</span>
        )}
      </div>
    </div>
  );
};

export default RowBodyShort;
