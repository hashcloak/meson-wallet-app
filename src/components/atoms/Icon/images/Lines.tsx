import React from 'react'

import { theme } from '@/utils/theme'

const sizes = theme.icons.sizes
const colors = theme.icons.colors

type Props = {
  iconSize: keyof typeof sizes
  color: keyof typeof colors
}

const Lines: React.FC<Props> = ({ iconSize, color }) => {
  const px = sizes[iconSize]

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      width={px}
      height={px}
      fill={color}
      className='object-contain'
    >
      <path d='M0 0h24v24H0z' fill='none' />
      <path d='M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z' />
    </svg>
  )
}

export default Lines
