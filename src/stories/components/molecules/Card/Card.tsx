import { useState } from 'react'

import EthAddress from '../../../utils/Ethereum/EthAddress'
import { Icon } from '../../atoms/Icon/Icon'
import { Logo, LogoTypes } from '../../atoms/Icon/Logo'
import { TransactionType } from '../../organisms/Timeline/Timeline'
import { TxStatus } from '../IconText/TxStatus'
import TxModal from '../Modal/TxModal'

import { unixTimeConverter } from '~/stories/utils/unixTimeConverter'
import Spacer from '~/utils/Spacer'

type TokensType = {
  [key: string]: { token: string; logo: LogoTypes }
}

const tokens: TokensType = {
  ethereum: { token: 'ETH', logo: 'EthLogo' },
}

type Props = {
  tx: TransactionType
}

// TODO: The temp props is applied, it needs to be updated.
const Card: React.FC<Props> = ({ tx }) => {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(!isOpen)

  const { token, amount, isSuccess, status, ethAddress, timestamp } = tx
  const { date, time } = unixTimeConverter(timestamp)

  return (
    <div className="flex justify-center items-center h-[18rem] after:w-[4rem] after:border-t-2 after:border-borderGray after:content-['']">
      <div className='w-full h-full flex justify-center items-start'>
        <span className='relative w-[12.5rem] text-center'>
          <span className='text-sm font-bold text-textWhite'>{date}</span>
          <br />
          <span className='text-sm text-textWhite'>{time}</span>
          <div className='w-full flex justify-center'>
            {isSuccess ? (
              <Icon type={'CheckCircle'} size={'xl'} color={'main'} />
            ) : (
              <Icon type={'FailCircle'} size={'xl'} color={'alert'} />
            )}
          </div>
          <button
            className="
        w-[12.5rem]
        h-[13rem]
        rounded-2xl
        bg-bgDarkLight
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
            type='button'
            onClick={onClose}
          >
            <div className='flex flex-col justify-center items-center h-2/3'>
              <div className='flex flex-row justify-center items-center'>
                <TxStatus
                  type={status}
                  size={'xl'}
                  color={'bgWhite'}
                  status={status}
                />
              </div>
              {status.toString() == 'OwnerChange' ||
              status.toString() == 'OnChainRejection' ? null : (
                <>
                  <Spacer size={8} axis={'vertical'} />
                  <Logo type={tokens[token].logo} size={'xl'} />
                  <Spacer size={8} axis={'vertical'} />
                  <span className='text-lg text-textWhite font-bold'>
                    - {amount} ETH
                  </span>
                </>
              )}
            </div>
            <Spacer size={8} axis={'vertical'} />
            <div className='flex flex-col justify-center items-center border-t-2 border-solid border-borderGray pt-2 h-1/3'>
              <span className='text-sm text-textWhite text-left w-full'>
                To:
              </span>
              <div className='flex flex-row items-center'>
                <EthAddress
                  ethAddress={ethAddress}
                  size={2}
                  length={'short'}
                  icons={false}
                />
              </div>
            </div>
          </button>
          {/* TODO: Need to edit props after deciding the tx's data structure */}
          <TxModal isOpen={isOpen} onClose={onClose} />
        </span>
      </div>
    </div>
  )
}

export default Card
