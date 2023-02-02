import React from 'react'

import { theme } from '~/stories/utils/theme'

const sizes = theme.icons.sizes
const colors = theme.icons.colors

type Props = {
  iconSize: keyof typeof sizes
  color: keyof typeof colors
}

const NewTx: React.FC<Props> = ({ iconSize, color }) => {
  const px = sizes[iconSize]
  const fill = colors[color]

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill={fill}
      width={px}
      height={px}
    >
      <path d='M0 0h24v24H0V0z' fill='none' />
      <path d='M4.01 6.03l7.51 3.22-7.52-1 .01-2.22m7.5 8.72L4 17.97v-2.22l7.51-1M2.01 3L2 10l15 2-15 2 .01 7L23 12 2.01 3z' />
    </svg>
  )
}

export default NewTx
