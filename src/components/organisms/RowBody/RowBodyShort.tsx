import { RowBodyType } from '.'
import { Logo } from '@/components/atoms/Icon'
import { LogoTypes } from '@/components/atoms/Icon/Logo'
import { TxStatus } from '@/components/molecules/IconText'
import Spacer from '@/utils/Spacer'
import { unixTimeConverter } from '@/utils/unixTimeConverter'

const RowBodyShort: React.FC<RowBodyType> = ({
  amount,
  token,
  to,
  from,
  timestamp,
  status,
  numOfConfirmation,
  isSuccess,
}) => {
  const { date, time } = unixTimeConverter(timestamp)
  return (
    <div className='flex flex-row justify-between items-center w-full'>
      <TxStatus type={status} size={'xl'} color={'white'} />
      <Spacer size={16} axis={'horizontal'} />
      <div className='flex flex-col justify-start w-full h-full'>
        <div className='flex flex-row items-center'>
          <Logo type={`${token}Logo` as LogoTypes} size={'lg'} />
          <Spacer size={8} axis={'horizontal'} />
          <span className='text-textWhite font-bold text-lg'>
            {amount} {token?.toUpperCase()}
          </span>
        </div>
        {to ? (
          <span className='text-textGrayLight text-xs'>To: {to}</span>
        ) : (
          <span className='text-textGrayLight text-xs'>From: {from}</span>
        )}
      </div>
      <Spacer size={16} axis={'horizontal'} />
      <div className='flex flex-col items-start w-full h-full'>
        <span className='text-textWhite text-sm'>{date}</span>
        <span className='text-textGrayLight text-xs'>{time}</span>
      </div>
      <Spacer size={16} axis={'horizontal'} />
      <div className='flex flex-col items-start w-full h-full'>
        {numOfConfirmation && !isSuccess ? (
          <>
            <span className='text-textWhite text-sm'>Needs confirmation</span>
            <span className='text-textGrayLight text-xs'>{numOfConfirmation} out of 2</span>
          </>
        ) : (
          <span className='text-textWhite text-sm'>{isSuccess}</span>
        )}
      </div>
    </div>
  )
}

export default RowBodyShort
