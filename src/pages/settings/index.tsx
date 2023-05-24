import SettingsContents from '~/components/templates/SettingsContents';
import Sidebar from '~/components/templates/Sidebar';
import Topbar from '~/components/templates/Topbar';
import { BaseLayout } from '~/utils/Layouts';

const Settings: React.FC = () => (
  <BaseLayout
    topbar={<Topbar />}
    sidebar={<Sidebar />}
    body={<SettingsContents />}
  />
);

export default Settings;
