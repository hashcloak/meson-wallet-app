import OwnerSetting from './OwnerSetting'

import Spacer from '~/utils/Spacer'

export default {
  title: 'Components/Template/OwnerSetting',
  component: OwnerSetting,
}

export const OwnerSettings = () => {
  return (
    <div className='flex flex-col justify-between w-screen'>
      <OwnerSetting />
    </div>
  )
}
