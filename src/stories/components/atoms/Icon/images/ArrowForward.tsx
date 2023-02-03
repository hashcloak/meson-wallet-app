import React from 'react'

import { theme } from '~/stories/utils/theme'

const sizes = theme.icons.sizes
const colors = theme.icons.colors

type Props = {
  iconSize: keyof typeof sizes
  color: keyof typeof colors
}

const ArrowForward: React.FC<Props> = ({ iconSize, color }) => {
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
        <path d='M0,0h24v24H0V0z' fill='none' />
      </g>
      <g>
        <polygon points='6.23,20.23 8,22 18,12 8,2 6.23,3.77 14.46,12' />
      </g>
    </svg>
  )
}

export default ArrowForward
