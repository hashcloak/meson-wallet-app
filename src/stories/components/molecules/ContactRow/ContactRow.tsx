import React from 'react'

import Button from '../../atoms/Button/Button'
import { Icon } from '../../atoms/Icon/Icon'
import { mockContacts } from '../../template/ContactsContents/ContactsContents'

import EthAddress from '~/stories/utils/Ethereum/EthAddress'
import Spacer from '~/utils/Spacer'
export type ContactType = {
  name?: string
  address: string
}

type Props = {
  contact: ContactType
}

const ContactRow: React.FC<Props> = ({ contact }) => {
  // const ContactRow = () => {
  // const contact = mockContacts[0]
  return (
    <div className='grid grid-cols-[15%_70%_15%] items-center w-full text-textWhite'>
      <span className=''>{contact.name}</span>
      <div className=''>
        <EthAddress ethAddress={contact.address} size={4.5} length={'full'} />
      </div>

      <div className='flex flex-row items-center'>
        <Button btnVariant={'primary'} btnSize={'sm'} btnType={'button'}>
          Send
        </Button>
        <Spacer size={8} axis={'horizontal'} />
        <button type='button'>
          <Icon type={'Edit'} size={'lg'} color={'main'} />
        </button>
        <Spacer size={8} axis={'horizontal'} />
        <button type='button'>
          <Icon type={'Delete'} size={'lg'} color={'alert'} />
        </button>
      </div>
    </div>
  )
}

export default ContactRow
