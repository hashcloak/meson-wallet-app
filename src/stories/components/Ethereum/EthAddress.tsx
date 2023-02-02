import React, { useEffect, useState } from 'react'
import Blockies from 'react-blockies'

import CopyToClipboardBtn from '~/stories/utils/CopyToClipboardBtn/CopyToClipboardBtn'
import ViewOn from '~/stories/utils/ViewOn/ViewOn'
import Spacer from '~/utils/Spacer'

type Props = {
  ethAddress: string
  size: number
  length: 'short' | 'full'
}

const EthAddress: React.FC<Props> = ({ ethAddress, size, length }) => {
  const [address, setAddress] = useState(ethAddress)
  const trimAddress = (address: string): string =>
    `${address.slice(0, 6)}...${address.slice(address.length - 4)}`

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
      <span className='text-textWhite text-sm font-bold ml-2'>eth:&nbsp;</span>
      <span className='text-textWhite text-base font-normal'>{address}</span>
      <div className='flex flex-row ml-4 items-center'>
        <CopyToClipboardBtn textToCopy={ethAddress} />
        <Spacer size={8} axis={'horizontal'} />
        <ViewOn address={ethAddress} />
      </div>
    </div>
  )
}

export default EthAddress
