import Table from './Table'

import { DisplayBox } from '~/utils/DisplayBox'

export default {
  title: 'Components/molecules/Tables',
  component: 'Table',
}

export const Tables = (): React.ReactElement => {
  return (
    <div className='flex flex-row w-screen flex-wrap'>
      <DisplayBox title={'Short Tables'}>
        <div className='flex flex-row flex-wrap w-[782px]'>
          <Table size={'short'} />
        </div>
      </DisplayBox>

      <DisplayBox title={'Long Tables'}>
        <div className='flex flex-row flex-wrap w-full'>
          <Table size={'long'} />
        </div>
      </DisplayBox>
    </div>
  )
}
