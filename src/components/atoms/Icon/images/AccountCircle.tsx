import React from 'react'

import { theme } from '@/utils/theme'

const sizes = theme.icons.sizes
const colors = theme.icons.colors

type Props = {
  iconSize: keyof typeof sizes
  color: keyof typeof colors
}

const AccountCircle: React.FC<Props> = ({ iconSize, color }) => {
  const px = sizes[iconSize]
  const fill = colors[color]

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      enableBackground='new 0 0 24 24'
      viewBox='0 0 24 24'
      fill={fill}
      width={px}
      height={px}
      className='object-contain'
    >
      <g>
        <rect fill='none' height='24' width='24' />
      </g>
      <g>
        <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20z' />
      </g>
    </svg>
  )
}

export default AccountCircle