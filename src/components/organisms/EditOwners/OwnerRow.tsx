import { useState } from 'react';
import { Icon } from '~/components/atoms/Icon';
import EthAddress from '~/utils/Ethereum/EthAddress';
import Spacer from '~/utils/Spacer';
import EditOwnerModal from '../EditOwnerModal';
import RemoveOwnerModal from '../RemoveOwnerModal';
import ReplaceOwnerModal from '../ReplaceOwnerModal';
import { OwnerType } from '.';

const OwnerRow: React.FC<{ owner: OwnerType }> = ({ owner }) => {
  const [isOpenEditOwnerModal, setIsOpenEditOwnerModal] = useState(false);
  const [isOpenReplaceOwnerModal, setIsOpenReplaceOwnerModal] = useState(false);
  const [isOpenRemoveOwnerModal, setIsOpenRemoveOwnerModal] = useState(false);

  const handleEditOwnerModal = (): void => {
    setIsOpenEditOwnerModal(!isOpenEditOwnerModal);
  };
  const handleReplaceOwnerModal = (): void => {
    setIsOpenReplaceOwnerModal(!isOpenReplaceOwnerModal);
  };
  const handleRemoveOwnerModal = (): void => {
    setIsOpenRemoveOwnerModal(!isOpenRemoveOwnerModal);
  };

  return (
    <div className='flex flex-row mb-2' key={owner.ownerAddress}>
      <EthAddress
        ethAddress={owner.ownerAddress}
        size={4.5}
        length={'full'}
        walletName={owner.ownerName}
      />
      <Spacer size={40} axis={'horizontal'} />
      <div className='flex flex-row items-center'>
        <Spacer size={8} axis={'horizontal'} />
        <button type='button' onClick={handleEditOwnerModal}>
          <Icon type={'Edit'} size={'lg'} color={'main'} />
        </button>

        <Spacer size={8} axis={'horizontal'} />

        <button type='button' onClick={handleReplaceOwnerModal}>
          <Icon type={'Change'} size={'lg'} color={'light'} />
        </button>

        <Spacer size={8} axis={'horizontal'} />

        <button type='button' onClick={handleRemoveOwnerModal}>
          <Icon type={'Delete'} size={'lg'} color={'alert'} />
        </button>
      </div>
      <EditOwnerModal
        isOpen={isOpenEditOwnerModal}
        onClose={handleEditOwnerModal}
        name={owner.ownerName}
        address={owner.ownerAddress}
      />
      <ReplaceOwnerModal
        isOpen={isOpenReplaceOwnerModal}
        onClose={handleReplaceOwnerModal}
        name={owner.ownerName}
        address={owner.ownerAddress}
      />
      <RemoveOwnerModal
        isOpen={isOpenRemoveOwnerModal}
        onClose={handleRemoveOwnerModal}
        name={owner.ownerName}
        address={owner.ownerAddress}
      />
    </div>
  );
};

export default OwnerRow;
