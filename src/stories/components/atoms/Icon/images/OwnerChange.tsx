import React from 'react'

import { theme } from '~/stories/utils/theme'

const sizes = theme.icons.sizes
const colors = theme.icons.colors

type Props = {
  iconSize: keyof typeof sizes
  color: keyof typeof colors
}

const OwnerChange: React.FC<Props> = ({ iconSize, color }) => {
  const px = sizes[iconSize]

  return (
    <svg
      width={px}
      height={px}
      className='object-contain'
      viewBox='0 0 33 33'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='16.5' cy='16.375' r='16' className={`fill-${color}`} />
      <g clipPath='url(#clip0_10856_22357)'>
        <path
          d='M14.4998 16.375C16.7089 16.375 18.4998 14.5841 18.4998 12.375C18.4998 10.1659 16.7089 8.375 14.4998 8.375C12.2906 8.375 10.4998 10.1659 10.4998 12.375C10.4998 14.5841 12.2906 16.375 14.4998 16.375Z'
          fill='#212121'
        />
        <path
          d='M15.1698 17.395C14.9498 17.385 14.7298 17.375 14.4998 17.375C12.0798 17.375 9.81976 18.045 7.88976 19.195C7.00976 19.715 6.49976 20.695 6.49976 21.725V24.375H15.7598C14.9698 23.245 14.4998 21.865 14.4998 20.375C14.4998 19.305 14.7498 18.305 15.1698 17.395Z'
          fill='#212121'
        />
        <path
          d='M25.2499 20.375C25.2499 20.155 25.2199 19.955 25.1899 19.745L26.3299 18.735L25.3299 17.005L23.8799 17.495C23.5599 17.225 23.1999 17.015 22.7999 16.865L22.4999 15.375H20.4999L20.1999 16.865C19.7999 17.015 19.4399 17.225 19.1199 17.495L17.6699 17.005L16.6699 18.735L17.8099 19.745C17.7799 19.955 17.7499 20.155 17.7499 20.375C17.7499 20.595 17.7799 20.795 17.8099 21.005L16.6699 22.015L17.6699 23.745L19.1199 23.255C19.4399 23.525 19.7999 23.735 20.1999 23.885L20.4999 25.375H22.4999L22.7999 23.885C23.1999 23.735 23.5599 23.525 23.8799 23.255L25.3299 23.745L26.3299 22.015L25.1899 21.005C25.2199 20.795 25.2499 20.595 25.2499 20.375ZM21.4999 22.375C20.3999 22.375 19.4999 21.475 19.4999 20.375C19.4999 19.275 20.3999 18.375 21.4999 18.375C22.5999 18.375 23.4999 19.275 23.4999 20.375C23.4999 21.475 22.5999 22.375 21.4999 22.375Z'
          fill='#212121'
        />
      </g>
      <defs>
        <clipPath id='clip0_10856_22357'>
          <rect
            width='24'
            height='24'
            fill='white'
            transform='translate(4.5 4.375)'
          />
        </clipPath>
      </defs>
    </svg>
  )
}

export default OwnerChange
