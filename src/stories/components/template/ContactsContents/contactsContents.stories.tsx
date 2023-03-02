import ContactsContents from './ContactsContents'

import Spacer from '~/utils/Spacer'

export default {
  title: 'Components/Template/ContactsContents',
  component: ContactsContents,
}

export const Default = () => {
  return (
    <div className='flex flex-col justify-between w-screen'>
      <ContactsContents />
    </div>
  )
}
