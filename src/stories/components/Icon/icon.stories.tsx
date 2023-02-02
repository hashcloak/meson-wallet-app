import { Meta } from '@storybook/react'
import React from 'react'

import { Icon, IconTypes } from './Icons'

import { DisplayBox } from '~/utils/DisplayBox'

export default {
  title: 'Components/Icons',
  component: Icon,
  argTypes: {
    size: {
      options: ['sm', 'md'],
      control: { type: 'radio' },
    },
  },
}

export const Icons = (): React.ReactElement => {
  const icons: IconTypes[] = [
    'CheckCircle',
    'Close',
    'Info',
    'OpenInNew',
    'Circle',
    'ContentCopy',
  ]
  return (
    <div className='flex flex-row w-screen flex-wrap'>
      <DisplayBox title={'Small'}>
        <div className='flex flex-row justify-evenly'>
          {icons.map((type) => (
            <div
              className='flex flex-col items-center justify-center border border-solid border-borderGray rounded-sm p-4 w-32 h-32'
              key={type}
            >
              <Icon type={type} size={'sm'} color={'main'} />
              <p className='mt-4 text-textGray'>{type}</p>
            </div>
          ))}
        </div>
      </DisplayBox>

      <DisplayBox title={'Medium'}>
        <div className='flex flex-row justify-evenly'>
          {icons.map((type) => (
            <div
              className='flex flex-col items-center justify-center border border-solid border-borderGray rounded-sm p-4 w-32 h-32'
              key={type}
            >
              <Icon type={type} size={'md'} color={'main'} />
              <p className='mt-4 text-textGray'>{type}</p>
            </div>
          ))}
        </div>
      </DisplayBox>

      <DisplayBox title={'Large'}>
        <div className='flex flex-row justify-evenly'>
          {icons.map((type) => (
            <div
              className='flex flex-col items-center justify-center border border-solid border-borderGray rounded-sm p-4 w-32 h-32'
              key={type}
            >
              <Icon type={type} size={'lg'} color={'main'} />
              <p className='mt-4 text-textGray'>{type}</p>
            </div>
          ))}
        </div>
      </DisplayBox>
    </div>
  )
}
