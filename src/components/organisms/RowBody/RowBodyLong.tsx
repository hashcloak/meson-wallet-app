import { TxStatus } from '../../molecules/IconText'
import { RowBodyType } from '.'
import { Logo } from '@/components/atoms/Icon'
import { LogoTypes } from '@/components/atoms/Icon/Logo'
import Spacer from '@/utils/Spacer'
import { unixTimeConverter } from '@/utils/unixTimeConverter'

const RowBodyLong: React.FC<RowBodyType> = ({
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

  const address = () => {
    if (to) {
      return `To: ${to}`
    } else if (from) {
      return `From: ${from}`
    } else {
      return null
    }
  }

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
              {amount} {token?.toUpperCase()}
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
        {numOfConfirmation && !isSuccess ? (
          <>
            <div className='flex flex-col items-start'>
              <span className='text-textGrayLight text-xs'> {numOfConfirmation} out of 2</span>
            </div>
            <div className='flex flex-col items-start '>
              <span className='text-textWhite text-sm'>Needs confirmation</span>
            </div>{' '}
          </>
        ) : (
          <span className='text-textWhite text-sm'>{isSuccess}</span>
        )}
      </div>
    </div>
  )
}

export default RowBodyLong
