import CustomLink from './CustomLink'

import { DisplayBox } from '~/utils/DisplayBox'

export default {
  title: 'Components/Atmos/CustomLink',
  component: CustomLink,
}

export const CustomLinks = () => {
  return (
    <div className='flex flex-row w-screen flex-wrap'>
      <DisplayBox title={'Option'}>
        <div className='flex flex-row flex-wrap w-full'>
          <div className='m-4'>
            <CustomLink url={'https://'} size={'xs'} text={'Sample link'} />
          </div>
        </div>
      </DisplayBox>
    </div>
  )
}
