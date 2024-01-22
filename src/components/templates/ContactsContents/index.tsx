import { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '~/components/atoms/Button';
import { Icon } from '~/components/atoms/Icon';
import { Input } from '~/components/atoms/Input';
import AddNewContactModal from '~/components/organisms/AddNewContactModal';
import ContactRow from '~/components/organisms/ContactRow';
import Spacer from '~/utils/Spacer';
import { MesonWalletState } from '~/features/mesonWallet';
import { RootState } from '~/features/reducers';

const ContactsContents: React.FC = () => {
  const { contacts } = useSelector<RootState, MesonWalletState>(
    (state) => state.mesonWallet
  );

  const [input, setInput] = useState('');
  const [newContacts, setNewContacts] = useState(contacts);
  const [openAddNewContactModal, setOpenAddNewContactModal] = useState(false);

  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleAddNewContactModal = () =>
    setOpenAddNewContactModal(!openAddNewContactModal);

  useEffect(() => {
    setNewContacts(contacts);
  }, [contacts]);

  useEffect(() => {
    if (input === '') {
      setNewContacts(contacts);

      return;
    }

    const searchKeywords = input
      .trim()
      .toLowerCase()
      .match(/[^\s]+/g);

    if (searchKeywords === null) {
      setNewContacts(newContacts);

      return;
    }

    const result = newContacts?.filter((contact) =>
      searchKeywords.every(
        (kw) =>
          contact.name.toLowerCase().includes(kw) ||
          contact.address.toLowerCase().includes(kw)
      )
    );
    setNewContacts(
      result !== undefined && result?.length > 0 ? result : contacts
    );
  }, [input]);

  return (
    <div className='flex flex-col w-full text-textWhite'>
      <span className='text-textGray dark:text-textWhite text-2xl font-bold'>
        Contacts
      </span>
      <div className='flex flex-row justify-between w-full my-2'>
        <div className='w-1/4 flex flex-row items-center gap-2'>
          <Input
            type={'text'}
            handleChange={handleUserInput}
            placeholder={'Search...'}
          />
          <Button
            btnVariant='border'
            btnSize='sm'
            btnType='button'
            handleClick={() => setInput('')}
          >
            Clear
          </Button>
        </div>
        <button
          className='flex flex-row items-center'
          type='button'
          onClick={handleAddNewContactModal}
        >
          <Icon type={'AddExist'} size={'lg'} color={'white'} />
          <span className='ml-2'>Add new</span>
        </button>
        <AddNewContactModal
          isOpen={openAddNewContactModal}
          onClose={handleAddNewContactModal}
        />
      </div>
      <div className='rounded-2xl text-textWhite bg-bgGrayMid dark:bg-bgDarkMid px-8 py-6 w-full h-full box-border'>
        <div className='grid grid-cols-[15%_70%_15%] box-border text-textGrayLight max-w-full justify-between'>
          <span className='col-span-1'>Name</span>
          <span className='col-span-1'>Address</span>

          <div />
        </div>
        <Spacer size={8} axis={'vertical'} />
        <div className='box-border grid grid-cols-1 gap-2'>
          {newContacts?.length !== undefined ? (
            newContacts?.map((contact) => (
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
  );
};

export default ContactsContents;
