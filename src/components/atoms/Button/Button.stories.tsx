import { action } from '@storybook/addon-actions'
import { Button, SignerWalletButton } from '.'
import { theme } from '@/utils/theme'

export default {
  title: 'Components/Atmos/Button',
  component: { Button, SignerWalletButton },
  argTypes: { onClick: { action: 'clicked' } },
}

export const Default = (): React.ReactElement => {
  const variants = Object.keys(theme.buttons.variants)

  return (
    <div className='flex flex-row w-screen flex-wrap'>
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
      <div className='flex flex-row flex-wrap w-full'>
        <div className='m-4'>
          <Button btnType='button' btnVariant='special' btnSize='sp' disabled={true}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
}

// export const SignerWalletButtons = (): React.ReactElement => {
//   const variants = Object.keys(theme.buttons.variants)

//   return (
//     <div className='flex flex-row w-screen flex-wrap'>
//       <div className='flex flex-row flex-wrap w-full'>
//             <SignerWalletButton            >
//               Submit
//             </SignerWalletButton>
//       </div>

//     </div>
//   )
// }
