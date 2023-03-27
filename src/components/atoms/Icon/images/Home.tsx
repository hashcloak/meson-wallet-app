import React from 'react'

import { theme } from '@/utils/theme'

const sizes = theme.icons.sizes
const colors = theme.icons.colors

type Props = {
  iconSize: keyof typeof sizes
  color: keyof typeof colors
}

const Home: React.FC<Props> = ({ iconSize, color }) => {
  const px = sizes[iconSize]
  const fill = colors[color]

  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill={fill} width={px} height={px}>
      <path d='M0 0h24v24H0V0z' fill='none' />
      <path d='M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z' />
    </svg>
  )
}

export default Home
