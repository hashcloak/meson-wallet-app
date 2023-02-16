import React, { useEffect, useState } from 'react'
import Blockies from 'react-blockies'

import CopyToClipboardBtn from '~/stories/utils/CopyToClipboardBtn/CopyToClipboardBtn'
import ViewOn from '~/stories/utils/ViewOn/ViewOn'
import { trimAddress } from '~/stories/utils/trimAddress'
import Spacer from '~/utils/Spacer'

type Props = {
  ethAddress: string
  size: number
  length: 'short' | 'full'
  icons?: boolean
  walletName?: string
}

const EthAddress: React.FC<Props> = ({
  ethAddress,
  size,
  length,
  icons = true,
  walletName,
}) => {
  const [address, setAddress] = useState(ethAddress)

  useEffect(() => {
    if (length === 'short') setAddress(trimAddress(ethAddress))
  }, [])

  return (
    <div className='flex flex-row items-center'>
      <Blockies
        seed={address}
        scale={size}
        className='identicon rounded-full'
      />
      <div className='flex flex-col ml-2'>
        {walletName && walletName ? (
          <span className='text-textWhite text-base font-normal'>
            My wallet
          </span>
        ) : null}
        <div className='flex flex-row items-center'>
          <span className='text-textWhite text-sm font-bold'>eth:&nbsp;</span>
          <span className='text-textWhite text-base font-normal'>
            {address}
          </span>
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
