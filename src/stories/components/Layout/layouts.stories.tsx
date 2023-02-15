import BaseLayout from './BaseLayout'
import StartLayout from './StartLayout'

export default {
  title: 'Components/Layouts',
  component: ['BaseLayout', 'StartLayout'],
}

export const BaseLayouts = (): React.ReactElement => {
  return (
    <div className='flex flex-row w-screen flex-wrap'>
      <BaseLayout />
    </div>
  )
}
export const StartLayouts = (): React.ReactElement => {
  return (
    <div className='flex flex-row w-screen flex-wrap'>
      <StartLayout />
    </div>
  )
}
