import DashboardContents from './DashboardContents'

import Spacer from '~/utils/Spacer'

export default {
  title: 'Components/Template/DashboardContents',
  component: DashboardContents,
}

export const DashboardContentss = () => {
  return (
    <div className='flex flex-col justify-between w-screen'>
      <DashboardContents />
    </div>
  )
}
