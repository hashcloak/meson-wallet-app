import ContactRow from '.'
import { mockContacts } from '@/utils/Mock'

export default {
  title: 'Components/Organisms/ContactRow',
  component: ContactRow,
}

export const Default = (): React.ReactElement => <ContactRow contact={mockContacts[0]} />
