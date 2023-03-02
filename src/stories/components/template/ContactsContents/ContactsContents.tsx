import { BasicInput } from '../../atoms/Input/BasicInput'
import ContactRow, { ContactType } from '../../molecules/ContactRow/ContactRow'
import Accounts from '../../organisms/Accounts/Accounts'
import AssetChart from '../../organisms/AssetChart/AssetChart'
import Portfolio from '../../organisms/Portfolio/Portfolio'
import RecentTxs from '../../organisms/RecentTxs/RecentTxs'

import Spacer from '~/utils/Spacer'

export const mockContacts: ContactType[] = [
  { address: '0xf86B25473cC08F04DA275B2847F2448cf041Fbd5', name: 'Test1' },
  { address: '0xf86B25473cC08F04DA275B2847F2448cf041Fbd5', name: 'Test2' },
]

const ContactsContents = () => {
  return (
    <div className='flex flex-col w-full'>
      <span className='text-textWhite text-2xl font-bold'>Contacts</span>
      {/* <BasicInput registeredName={'contact'} label={''} type={'text'} /> */}
      <div className='rounded-2xl text-textWhite bg-bgDarkMid px-8 py-6 w-full h-full box-border'>
        <div className='grid grid-cols-[15%_70%_15%] box-border text-textGrayLight max-w-full justify-between'>
          <span className='col-span-1'>Name</span>
          <span className='col-span-1'>Address</span>

          <div />
        </div>
        <Spacer size={8} axis={'vertical'} />
        <div className='box-border grid grid-cols-1 gap-2'>
          {mockContacts.length > 0 ? (
            mockContacts.map((contact) => (
              <ContactRow contact={contact} key={contact.address} />
            ))
          ) : (
            <div className='w-full h-full flex justify-center items-center'>
              <span className='text-textGrayLight'>No contact</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ContactsContents
