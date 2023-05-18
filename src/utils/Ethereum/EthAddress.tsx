import React, { useEffect, useState } from 'react'
import Blockies from 'react-blockies'

import { trimAddress } from '../trimAddress'
import CopyToClipboardBtn from '@/utils/CopyToClipboardBtn'
import Spacer from '@/utils/Spacer'
import ViewOn from '@/utils/ViewOn'

type Props = {
  ethAddress: string
  size: number
  length: 'short' | 'full'
  icons?: boolean
  walletName?: string
}

const EthAddress: React.FC<Props> = ({
  ethAddress,
  size = 4.5,
  length,
  icons = true,
  walletName,
}) => {
  const [address, setAddress] = useState(ethAddress)

  useEffect(() => {
    if (length === 'short') setAddress(trimAddress(ethAddress))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='flex flex-row items-center'>
      <Blockies seed={ethAddress} scale={size} className='identicon rounded-full' />
      <div className='flex flex-col ml-2 items-start'>
        {walletName && walletName ? (
          <span className='text-textWhite text-base font-normal'>My wallet</span>
        ) : null}
        <div className='flex flex-row items-center'>
          <span className='text-textWhite text-sm font-bold'>eth:&nbsp;</span>
          <span className='text-textWhite text-base font-normal'>{address}</span>
        </div>
      </div>
      {icons ? (
        <div className='flex flex-row ml-4 items-center'>
          <CopyToClipboardBtn textToCopy={ethAddress} />
          <Spacer size={8} axis={'horizontal'} />
          <ViewOn address={ethAddress} />
        </div>
      ) : null}
    </div>
  )
}

export default EthAddress
