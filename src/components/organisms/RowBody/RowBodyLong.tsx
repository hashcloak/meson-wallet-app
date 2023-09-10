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
  const {
    status,
    token,
    value,
    timeStamp,
    to,
    from,
    isError,
    numOfConfirmation,
  } = tx;

  const { date, time } = unixTimeConverter(timeStamp);

  const address = () => {
    if (to != null) {
      return `To: ${to}`;
    } else if (from != null) {
      return `From: ${from}`;
    } else {
      return null;
    }
  };

  return (
    <div className='grid grid-cols-2 gap-32 w-full'>
      <div className='grid grid-cols-2 items-center'>
        <div className='flex flex-row items-center'>
          <TxStatus type={status} size={'xl'} color={'white'} />
          <span className='text-textWhite font-bold text-base'>{status}</span>
        </div>

        <div className='flex flex-col justify-items-start'>
          <div className='flex flex-row items-center'>
            <Logo type={`${token}Logo` as LogoTypes} size={'lg'} />
            <Spacer size={8} axis={'horizontal'} />
            <span className='text-textWhite font-bold text-lg'>
              {value} {token?.toUpperCase()}
            </span>
          </div>
          <span className='text-textGrayLight text-xs'>{address()}</span>
        </div>
      </div>

      <div className='grid grid-cols-3 items-center'>
        <div className='flex flex-col items-start'>
          <span className='text-textWhite text-sm'>{date}</span>
          <span className='text-textGrayLight text-xs'>{time}</span>
        </div>
        {numOfConfirmation != null && !(!isError ?? false) ? (
          <>
            <div className='flex flex-col items-start'>
              <span className='text-textGrayLight text-xs'>
                {' '}
                {numOfConfirmation} out of 2
              </span>
            </div>
            <div className='flex flex-col items-start '>
              <span className='text-textWhite text-sm'>Needs confirmation</span>
            </div>{' '}
          </>
        ) : (
          <span className='text-textWhite text-sm'>{!isError}</span>
        )}
      </div>
    </div>
  );
};

export default RowBodyLong;
