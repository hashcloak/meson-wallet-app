import React from 'react'

import { theme } from '~/stories/utils/theme'

const sizes = theme.icons.sizes
const colors = theme.icons.colors

type Props = {
  iconSize: keyof typeof sizes
  color: keyof typeof colors
}

const Conflict: React.FC<Props> = ({ iconSize, color }) => {
  const px = sizes[iconSize]

  return (
    <svg
      width={px}
      height={px}
      className='object-contain'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='16' cy='16' r='16' className={`fill-${color}`} />
      <g clipPath='url(#clip0_10856_21409)'>
        <path
          d='M5 23H27L16 4L5 23ZM17 20H15V18H17V20ZM17 16H15V12H17V16Z'
          fill='#FF9169'
        />
      </g>
      <defs>
        <clipPath id='clip0_10856_21409'>
          <rect
            width='24'
            height='24'
            fill='white'
            transform='translate(4 2)'
          />
        </clipPath>
      </defs>
    </svg>
  )
}

export default Conflict
