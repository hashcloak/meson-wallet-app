import { ethers } from 'ethers';
import { Logo } from '~/components/atoms/Icon';
import { LogoTypes } from '~/components/atoms/Icon/Logo';
import Spacer from '~/utils/Spacer';
import { TxStatus } from '../../molecules/IconText';
import { TxType } from '~/hooks/useConvertTx';
import { unixTimeConverter } from '~/utils/unixTimeConverter';

type Props = {
  tx: TxType;
};

const RowBodyLong: React.FC<Props> = ({ tx }) => {
  const { status, token, value, timestamp, to, from, numOfConfirmation } = tx;

  const { date, time } = unixTimeConverter(
    timestamp !== undefined ? timestamp : 0
  );

  const address = () => {
    if (status === 'Received') {
      return `From: ${from}`;
    } else {
      return `To: ${to !== undefined ? to : ''}`;
    }
  };

  const ethVal = ethers.utils.formatEther(value);

  return (
    <div className='flex flex-row gap-32 min-w-[52rem] max-w-[79.875rem]'>
      <div className='grid grid-cols-2 items-center'>
        <div className='flex flex-row items-center'>
          <TxStatus type={status} size={'xl'} color={'white'} />
          <span className='text-textWhite font-bold text-base'>{status}</span>
        </div>

        <div className='flex flex-col justify-items-start w-[21rem]'>
          {status === 'AccountCreated' ||
          status === 'OwnerChange' ||
          status === 'OnChainRejection' ? null : (
            <>
              <div className='flex flex-row items-center'>
                <Logo type={`${token}Logo` as LogoTypes} size={'lg'} />
                <Spacer size={8} axis={'horizontal'} />
                <span className='text-textWhite font-bold text-lg'>
                  {String(ethVal)} {token?.toUpperCase()}
                </span>
              </div>
              <span className='text-textGrayLight text-xs'>{address()}</span>
            </>
          )}
        </div>
      </div>

      {numOfConfirmation != null ? (
        <div className='grid grid-cols-3 items-center'>
          <div className='flex flex-col items-start'>
            <span className='text-textWhite text-sm'>{date}</span>
            <span className='text-textGrayLight text-xs'>{time}</span>
          </div>
          <div className='flex flex-col items-start'>
            {numOfConfirmation - numOfConfirmation !== 0 ? (
              <span className='text-textGrayLight text-xs'>
                {numOfConfirmation} out of 2
              </span>
            ) : null}
          </div>
          <div className='flex flex-col items-start '>
            {numOfConfirmation - numOfConfirmation !== 0 ? (
              <span className='text-textWhite text-sm'>Needs confirmation</span>
            ) : (
              <span className='text-textWhite text-sm'>Success</span>
            )}
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-start justify-center'>
          <span className='text-textWhite text-sm'>{date}</span>
          <span className='text-textGrayLight text-xs'>{time}</span>
        </div>
      )}
    </div>
  );
};

export default RowBodyLong;
