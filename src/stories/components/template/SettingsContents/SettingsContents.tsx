import TabsVertical from '../../molecules/Tab/TabsVertical'

import GeneralSettings from './GeneralSettings'
import WalletSettings from './WalletSettings'

const SettingsContents = () => {
  const tabList: { [key: string]: JSX.Element }[] = [
    { General: <GeneralSettings /> },
    { 'Wallet details': <WalletSettings /> },
  ]
  return (
    <>
      <TabsVertical tabList={tabList} />
    </>
  )
}

export default SettingsContents
