import { useState } from 'react';
import { mockOwners } from '~/utils/Mock';
import RemoveOwnerModal from '.';

export default {
  title: 'Components/Organisms/RemoveOwnerModal',
  component: RemoveOwnerModal,
};

export const Default: React.FC = (): React.ReactElement => {
  const [isOpenRemoveOwnerModal, setIsOpenRemoveOwnerModal] = useState(true);
  const handleRemoveOwnerModal = () => {
    setIsOpenRemoveOwnerModal(!isOpenRemoveOwnerModal);
  };

  return (
    <RemoveOwnerModal
      isOpen={isOpenRemoveOwnerModal}
      onClose={handleRemoveOwnerModal}
      name={mockOwners[0].address}
      address={mockOwners[0].address}
    />
  );
};
