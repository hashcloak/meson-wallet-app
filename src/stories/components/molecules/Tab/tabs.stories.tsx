import Tabs from './Tabs'

export default {
  title: 'Components/Molecules/Tabs',
  component: 'Tabs',
}

export const SampleTabs = (): React.ReactElement => {
  return (
    <div className='flex flex-row w-screen flex-wrap'>
      <div className='max-w-[5.5rem] py-4 px-2'>
        <Tabs />
      </div>
    </div>
  )
}
