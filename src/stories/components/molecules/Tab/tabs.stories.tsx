import GeneralSettings from '../../template/SettingsContents/GeneralSettings'
import WalletSettings from '../../template/SettingsContents/WalletSettings'

import Tabs, { Queue, History } from './Tabs'
import TabsVertical from './TabsVertical'

export default {
  title: 'Components/Molecules/Tabs',
  component: 'Tabs',
}

export const Default = (): React.ReactElement => {
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

export const Vertical = (): React.ReactElement => {
  const tabList: { [key: string]: JSX.Element }[] = [
    { General: <GeneralSettings /> },
    { 'Wallet details': <WalletSettings /> },
  ]

  return <TabsVertical tabList={tabList} />
}
