import { mockContacts } from '~/utils/Mock';
import ContactRow from '.';

export default {
  title: 'Components/Organisms/ContactRow',
  component: ContactRow,
};

export const Default: React.FC = (): React.ReactElement => (
  <ContactRow contact={mockContacts[0]} />
);
