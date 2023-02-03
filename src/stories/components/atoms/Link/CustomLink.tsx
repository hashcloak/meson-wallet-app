import React from 'react'

type Props = {
  url: string
  size: 'xs' | 'sm' | 'base' | 'md' | 'lg'
  text: string
}
const CustomLink: React.FC<Props> = ({ url, size, text }) => {
  return (
    <a
      href={url}
      className={`text-textLink hover:text-dark text-${size}`}
      target='_blank'
      rel='noreferrer'
    >
      {text}
    </a>
  )
}

export default CustomLink
