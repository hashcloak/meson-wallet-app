import Button from '../../atoms/Button/Button'
import CustomLink from '../../atoms/Link/CustomLink'
import Switch from '../../atoms/Switch/Switch'

import Spacer from '~/utils/Spacer'

const GeneralSettings = () => {
  return (
    <div className='flex flex-col w-full rounded-2xl bg-bgDarkLight text-textWhite text-lg px-8 py-4 h-full'>
      <span className='text-3xl font-bold'>General</span>
      <Spacer size={24} axis={'vertical'} />
      <div className='flex flex-col'>
        <span className='text-xl font-bold'>Versions</span>
        <Spacer size={16} axis={'vertical'} />
        <div className='pl-4'>
          <div className='flex flex-row'>
            <span className='mr-2'>Contract Version: </span>
            <CustomLink url={''} size={'base'}>
              1.3.0+L2
            </CustomLink>
          </div>
          <div className='flex flex-row'>
            <span className='mr-2'>App Version: </span>
            <CustomLink url={''} size={'base'}>
              1.0
            </CustomLink>
          </div>
        </div>
      </div>
      <Spacer size={32} axis={'vertical'} />
      <div className='flex flex-col'>
        <span className='text-xl font-bold'>Appearance</span>
        <Spacer size={16} axis={'vertical'} />
        <div className='pl-4'>
          <div className='flex flex-row'>
            <span className='mr-2'>Dark theme: </span>
            <Switch
              label={{
                on: 'On',
                off: 'Off',
              }}
              handleClick={function (): void {}}
            />
          </div>
          <div className='flex flex-row'>
            <span className='mr-2'>Language: </span>
            {/* TODO: */}
            <span>English</span>
          </div>
          <div className='flex flex-row'>
            <span className='mr-2'>Flat currency: </span>
            {/* TODO: */}
            <span>USD</span>
          </div>
        </div>
      </div>
      <Spacer size={32} axis={'vertical'} />
      <div className='flex flex-col'>
        <span className='text-xl font-bold'>Advanced</span>
        <Spacer size={16} axis={'vertical'} />
        <div className='pl-4'>
          <div className='flex flex-row'>
            <span className='mr-2'>Current Nonce: </span>
            <span>1</span>
          </div>
          <div className='flex flex-row'>
            <span className='mr-2'>Contact us: </span>
            <CustomLink url={'mailto:info@hashcloak.com'} size={'base'}>
              info@hashcloak.com
            </CustomLink>
          </div>
        </div>
      </div>
      <Spacer size={32} axis={'vertical'} />
      <div className='flex justify-end w-full'>
        <Button btnVariant={'alert'} btnSize={'lg'} btnType={'button'}>
          Remove wallet
        </Button>
      </div>
    </div>
  )
}

export default GeneralSettings
