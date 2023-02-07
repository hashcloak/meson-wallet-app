import Tabs, { Queue, History } from './Tabs'

export default {
  title: 'Components/Molecules/Tabs',
  component: 'Tabs',
}

export const SampleTabs = (): React.ReactElement => {
  const tabList: { [key: string]: JSX.Element }[] = [
    { Latest: <Queue /> },
    { Queue: <Queue /> },
    { History: <History /> },
  ]

  return (
    <div className='w-screen h-[64rem] max-w-[99.5rem] max-h-[62rem] pt-8 pb-10 px-[4.5rem] bg-bgDark'>
      <Tabs tabList={tabList} />
    </div>
  )
}
