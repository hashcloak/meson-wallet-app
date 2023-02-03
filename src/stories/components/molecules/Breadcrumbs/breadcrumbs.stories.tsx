import Breadcrumb from './Breadcrumb'

import { DisplayBox } from '~/utils/DisplayBox'

export default {
  title: 'Components/Molecules/Breadcrumb',
  component: 'Breadcrumb',
}

export const Breadcrumbs = (): React.ReactElement => {
  return (
    <div className='flex flex-row w-screen flex-wrap'>
      {/* <DisplayBox title={'Breadcrumbs'}> */}
      <div className='flex flex-row flex-wrap w-full'>
        <div className='m-4'>
          <Breadcrumb />
        </div>
      </div>
      {/* </DisplayBox> */}
    </div>
  )
}
