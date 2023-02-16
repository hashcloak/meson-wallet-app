import React from 'react'

import { Icon, IconColors, IconTypes } from '../../atoms/Icon/Icon'

type Props = {
  text: string
  iconType: IconTypes
  iconColor: IconColors
}

const IconText: React.FC<Props> = ({ text, iconType, iconColor }) => {
  return (
    <div>
      <span>{text}</span>
      <Icon type={iconType} size={'lg'} color={iconColor} />
    </div>
  )
}

export default IconText
