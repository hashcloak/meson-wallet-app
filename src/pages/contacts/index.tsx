import ContactsContents from '~/components/templates/ContactsContents';
import Sidebar from '~/components/templates/Sidebar';
import Topbar from '~/components/templates/Topbar';
import { BaseLayout } from '~/utils/Layouts';

const Contacts: React.FC = () => {
  return (
    <BaseLayout
      topbar={<Topbar />}
      sidebar={<Sidebar />}
      body={<ContactsContents />}
    />
  );
};

export default Contacts;
