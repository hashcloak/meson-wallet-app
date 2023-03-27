import GeneralSettings from './GeneralSettings'
import WalletSettings from './WalletSettings'
import { VerticalTabs } from '@/components/molecules/Tabs'

const SettingsContents = () => {
  const tabList: { [key: string]: JSX.Element }[] = [
    { General: <GeneralSettings /> },
    { 'Wallet details': <WalletSettings /> },
  ]
  return (
    <>
      <VerticalTabs tabList={tabList} />
    </>
  )
}

export default SettingsContents
