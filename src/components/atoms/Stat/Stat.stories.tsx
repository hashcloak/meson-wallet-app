import Stat from '.'

import Spacer from '@/utils/Spacer'

export default {
  title: 'Components/Atmos/Stat',
  component: 'Stat',
}

export const Default = (): React.ReactElement => {
  return (
    <div className='flex flex-row w-screen flex-wrap'>
      <Stat title={'queue'} data={10} />
      <Spacer size={32} axis={'horizontal'} />
      <Stat title={'historied'} data={50} />
    </div>
  )
}
