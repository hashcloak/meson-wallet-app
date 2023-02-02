import { action } from '@storybook/addon-actions'

import { theme } from '../../utils/theme'

import Button from './Button'

import { DisplayBox } from '~/utils/DisplayBox'

export default {
  title: 'Components/Buttons',
  component: Button,
  argTypes: { onClick: { action: 'clicked' } },
}

export const Buttons = (): React.ReactElement => {
  const variants = Object.keys(theme.buttons.variants)

  return (
    <div className='flex flex-row w-screen flex-wrap'>
      <DisplayBox title={'sm'}>
        <div className='flex flex-row flex-wrap w-full'>
          {variants.map((variant: any) => (
            <div key={variant} className='m-4'>
              <Button
                btnType='button'
                btnVariant={variant}
                btnSize='sm'
                disabled={variant === 'disable' ? true : false}
                handleClick={action('clicked')}
              >
                Submit
              </Button>
            </div>
          ))}
        </div>
      </DisplayBox>
      <DisplayBox title={'md'}>
        <div className='flex flex-row flex-wrap w-full'>
          {variants.map((variant: any) => (
            <div key={variant} className='m-4'>
              <Button
                btnType='button'
                btnVariant={variant}
                btnSize='md'
                disabled={variant === 'disable' ? true : false}
              >
                Submit
              </Button>
            </div>
          ))}
        </div>
      </DisplayBox>
      <DisplayBox title={'lg'}>
        <div className='flex flex-row flex-wrap w-full'>
          {variants.map((variant: any) => (
            <div key={variant} className='m-4'>
              <Button
                btnType='button'
                btnVariant={variant}
                btnSize='lg'
                disabled={variant === 'disable' ? true : false}
              >
                Submit
              </Button>
            </div>
          ))}
        </div>
      </DisplayBox>
      <DisplayBox title={'special button'}>
        <div className='flex flex-row flex-wrap w-full'>
          <div className='m-4'>
            <Button
              btnType='button'
              btnVariant='special'
              btnSize='sp'
              disabled={true}
            >
              Submit
            </Button>
          </div>
        </div>
      </DisplayBox>
    </div>
  )
}
