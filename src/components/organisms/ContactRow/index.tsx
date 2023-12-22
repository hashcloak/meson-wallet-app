import React, { useState } from 'react';

import { Button } from '~/components/atoms/Button';
import { Icon } from '~/components/atoms/Icon';
import DeleteContactModal from '~/components/organisms/DeleteContactModal';
import EditContactModal from '~/components/organisms/EditContactModal';
import SendFundsModal from '~/components/organisms/NewTx/SendFundsModal';
import EthAddress from '~/utils/Ethereum/EthAddress';
import Spacer from '~/utils/Spacer';

export type ContactType = {
  name: string;
  address: string;
};

type Props = {
  contact: ContactType;
};

const ContactRow: React.FC<Props> = ({ contact }) => {
  const [isOpenSendFundsModal, setIsOpenSendFundsModal] = useState(false);
  const [isOpenEditContactModal, setIsOpenEditContactModal] = useState(false);
  const [isOpenDeleteContactModal, setIsOpenDeleteContactModal] =
    useState(false);

  const handleSendFundsModal = (): void => {
    setIsOpenSendFundsModal(!isOpenSendFundsModal);
  };
  const handleIsEditContactModal = (): void => {
    setIsOpenEditContactModal(!isOpenEditContactModal);
  };
  const handleIsDeleteContactModal = (): void => {
    setIsOpenDeleteContactModal(!isOpenDeleteContactModal);
  };

  return (
    <div className='grid grid-cols-[15%_70%_15%] items-center w-full text-textWhite'>
      <span className=''>{contact.name}</span>
      <div className=''>
        <EthAddress ethAddress={contact.address} size={4.5} length={'full'} />
      </div>

      <div className='flex flex-row items-center'>
        <Button
          btnVariant={'primary'}
          btnSize={'sm'}
          btnType={'button'}
          handleClick={handleSendFundsModal}
        >
          Send
        </Button>
        <Spacer size={8} axis={'horizontal'} />
        <button type='button' onClick={handleIsEditContactModal}>
          <Icon type={'Edit'} size={'lg'} color={'main'} />
        </button>
        <Spacer size={8} axis={'horizontal'} />
        <button type='button' onClick={handleIsDeleteContactModal}>
          <Icon type={'Delete'} size={'lg'} color={'alert'} />
        </button>
      </div>
      <SendFundsModal
        isOpen={isOpenSendFundsModal}
        onClose={handleSendFundsModal}
        recipientAddress={contact.address}
      />
      <EditContactModal
        isOpen={isOpenEditContactModal}
        onClose={handleIsEditContactModal}
        name={contact.name}
        address={contact.address}
      />
      <DeleteContactModal
        isOpen={isOpenDeleteContactModal}
        onClose={handleIsDeleteContactModal}
        name={contact.name}
        address={contact.address}
      />
    </div>
  );
};

export default ContactRow;
