import SettingsContents from '../../template/SettingsContents/SettingsContents'
import Sidebar from '../../template/Sidebar/Sidebar'
import Topbar from '../../template/Topbar/Topbar'

import BaseLayout from '~/stories/utils/Layout/BaseLayout'

const Settings = () => {
  return (
    <BaseLayout
      topbar={<Topbar />}
      sidebar={<Sidebar />}
      body={<SettingsContents />}
    />
  )
}

export default Settings
