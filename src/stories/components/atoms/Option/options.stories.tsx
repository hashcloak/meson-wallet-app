import Option from './Option'

import { mockNetworks } from '~/stories/utils/Mock'
import { DisplayBox } from '~/utils/DisplayBox'

export default {
  title: 'Components/Atmos/Options',
  component: Option,
}

export const Options = (): React.ReactElement => {
  return (
    <div className='flex flex-row w-screen flex-wrap'>
      <DisplayBox title={'Option'}>
        <div className='flex flex-row flex-wrap w-full'>
          <div className='m-4'>
            <Option options={mockNetworks} />
          </div>
        </div>
      </DisplayBox>
    </div>
  )
}
