import React from 'react'

import { theme } from '~/stories/utils/theme'

const sizes = theme.icons.sizes
const colors = theme.icons.colors

type Props = {
  iconSize: keyof typeof sizes
  color: keyof typeof colors
}

const Send: React.FC<Props> = ({ iconSize, color }) => {
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
      <g clipPath='url(#clip0_10856_22109)'>
        <path
          d='M13.7505 21.625H19.7505V15.625H23.7505L16.7505 8.625L9.75049 15.625H13.7505V21.625ZM9.75049 23.625H23.7505V25.625H9.75049V23.625Z'
          fill='#DC2626'
        />
      </g>
      <defs>
        <clipPath id='clip0_10856_22109'>
          <rect
            width='24'
            height='24'
            className={`fill-${color}`}
            transform='translate(4.5 4.875)'
          />
        </clipPath>
      </defs>
    </svg>
  )
}

export default Send
