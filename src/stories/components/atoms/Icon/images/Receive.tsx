import React from 'react'

import { theme } from '~/stories/utils/theme'

const sizes = theme.icons.sizes
const colors = theme.icons.colors

type Props = {
  iconSize: keyof typeof sizes
  color: keyof typeof colors
}

const Receive: React.FC<Props> = ({ iconSize, color }) => {
  const px = sizes[iconSize]

  return (
    <svg
      viewBox='0 0 33 33'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      width={px}
      height={px}
      className='object-contain'
    >
      <circle cx='16.5' cy='16.875' r='16' fill={color} />
      <g clipPath='url(#clip0_10856_22210)'>
        <path
          d='M23.7505 14.625H19.7505V8.625H13.7505V14.625H9.75049L16.7505 21.625L23.7505 14.625ZM9.75049 23.625V25.625H23.7505V23.625H9.75049Z'
          fill='#38C6F4'
        />
      </g>
      <defs>
        <clipPath id='clip0_10856_22210'>
          <rect
            width='24'
            height='24'
            fill='white'
            transform='translate(4.5 4.875)'
          />
        </clipPath>
      </defs>
    </svg>
  )
}

export default Receive
