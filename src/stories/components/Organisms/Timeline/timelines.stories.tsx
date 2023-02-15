import Timeline from './Timeline'

export default {
  title: 'Components/Organisms/Timelines',
  component: 'Timeline',
}

export const Timelines = (): React.ReactElement => {
  return (
    <div className='w-[75.rem] h-[22rem] max-w-[99.5rem] max-h-[62rem] pb-10 px-[4.5rem] bg-bgDarkMid'>
      <Timeline />
    </div>
  )
}
