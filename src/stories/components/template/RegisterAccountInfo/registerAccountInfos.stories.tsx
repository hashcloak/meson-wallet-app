import RegisterAccountInfo from './RegisterAccountInfo'

import Spacer from '~/utils/Spacer'

export default {
  title: 'Components/Template/RegisterAccountInfo',
  component: RegisterAccountInfo,
}

export const RegisterAccountInfos = () => {
  return (
    <div className='flex flex-col justify-between w-screen'>
      <RegisterAccountInfo />
    </div>
  )
}
